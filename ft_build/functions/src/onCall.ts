import * as functions from "firebase-functions";
import derivative from "./derivatives";
//import spark from "./sparks";

import {
  triggerPath,
  derivativesConfig,
  // documentSelectConfig,
  // sparksConfig,
  initializeConfig,
  actionScriptsConfig,
} from "./functionConfig";

//import propagate from "./propagates";
import initialize from "./initialize";
import validateAction from "./actionValidation";

import { db, auth } from "./firebaseConfig";
import utilFns, { serverTimestamp } from "./utils";

type onCallType = "action" | "execute";
type ActionResponse = {
  success: boolean;
  message: string;
  cellStatus?: string;
  newState?: "redo" | "undo" | "disabled";
};

type FireTableFilter = {
  key: string;
  operator: FirebaseFirestore.WhereFilterOp;
  value: string | number | boolean | string[];
};
const onCall = async (
  data: {
    type: onCallType;
    rowPaths: string[];
    actionParams?: any;
    query?: {
      collectionPath: string;
      isCollectionGroup: boolean;
      filters: FireTableFilter[];
    };
    actionKey?: string;
    executeKeys?: {
      derivativeKeys?: string[];
      initializeKeys?: string[];
      sparkKeys?: string[];
    };
  },
  context: functions.https.CallableContext
) => {
  const { type, rowPaths, actionKey, executeKeys, query } = data;
  const rowRefs = rowPaths.map((rowPath) => db.doc(rowPath));
  functions.logger.log({ triggerPath });
  switch (type) {
    case "action":
      const {
        requiredFields,
        requiredRoles,
        script,
      }: {
        requiredFields: string[];
        requiredRoles: string[];
        script: ({ context, row, ref, db, auth, utilFns }) => ActionResponse;
      } = actionScriptsConfig[actionKey];
      const actionPromises = rowRefs.map(async (ref) => {
        try {
          const row = (await ref.get()).data();
          validateAction({ context, row, requiredRoles, requiredFields });
          const result = await script({ context, row, ref, db, auth, utilFns });
          if (result.success) {
            const cellValue = {
              redo: result.newState === "redo",
              status: result.cellStatus,
              completedAt: serverTimestamp(),
              ranBy: context.auth!.token.email,
              undo: result.newState === "undo",
            };
            await db.doc(ref.path).update({ [actionKey]: cellValue });
            return {
              ...result,
              cellValue,
            };
          }
          return result;
        } catch (error) {
          return {
            success: false,
            error,
            message: error.message,
          };
        }
      });
      return await Promise.all(actionPromises);

    case "execute":
      const {
        derivativeKeys,
        initializeKeys,
        //   sparkKeys
      } = executeKeys;
      let rowSnapshots; //:FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>[] =[]
      if (rowRefs.length !== 0) {
        rowSnapshots = await Promise.all(rowRefs.map(async (ref) => ref.get()));
      } else if (query) {
        let rowsQuery:
          | FirebaseFirestore.CollectionReference
          | FirebaseFirestore.Query = query.isCollectionGroup
          ? db.collectionGroup(query.collectionPath)
          : db.collection(query.collectionPath);
        if (query.filters.length !== 0) {
          query.filters.forEach((filter) => {
            rowsQuery = rowsQuery.where(
              filter.key,
              filter.operator,
              filter.value
            );
          });
        }
        rowsQuery = rowsQuery.limit(10000);
        rowSnapshots = (await rowsQuery.get()).docs;
      } else {
        rowSnapshots = (
          await db.collection(triggerPath.replace("/{docId}", "")).get()
        ).docs;
      }
      const updatePromises = rowSnapshots.map(async (rowSnapshot) => {
        try {
          const selectedInitials = initializeConfig.filter((config) =>
            initializeKeys.includes(config.fieldName)
          );
          const initialData = await initialize(selectedInitials)(rowSnapshot);
          const selectedDerivatives = derivativesConfig.filter((config) =>
            derivativeKeys.includes(config.fieldName)
          );
          const derivativeData = await derivative(selectedDerivatives)({
            before: null,
            after: rowSnapshot,
          });
          return rowSnapshot.ref.update({
            ...initialData,
            ...derivativeData,
          });
        } catch (err) {
          console.log(`caught error: ${err}`);
          return false;
        }
      });
      await Promise.all(updatePromises);
      return 200;
    default:
      return 404;
  }
};

export default onCall;
