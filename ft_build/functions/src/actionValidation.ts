import * as functions from "firebase-functions";
/**
 * checks if the context auth token has any of the allowed roles
 * @param {string[]} authorizedRoles custom claim roles that are allowed to run.
 * @param {CallableContext} context callable context used to verify the user
 * @return {boolean} boolean
 */
const hasAnyAuthorizedRole = (
  authorizedRoles: string[],
  context: functions.https.CallableContext
) => {
  if (!context.auth || !context.auth.token.roles) return false;
  const userRoles = context.auth.token.roles as string[];
  return userRoles.some((v) => authorizedRoles.includes(v));
};

/**
 * checks for required but missing fields
 * @param {FirebaseFirestore.DocumentData} row document snapshot data
 * @return {string[]} an array of field keys missing from the row
 */
const missingFieldsReducer = (row: FirebaseFirestore.DocumentData) => (
  missingFields: string[],
  requiredField: string
) => {
  if (row[requiredField] === undefined || row[requiredField] === null) {
    return [...missingFields, requiredField];
  } else return missingFields;
};

const validateAction = ({
  context,
  row,
  requiredRoles,
  requiredFields,
}: {
  context: functions.https.CallableContext;
  row: FirebaseFirestore.DocumentData;
  requiredRoles: string[];
  requiredFields: string[];
}) => {
  if (!requiredRoles || requiredRoles.length === 0) {
    throw Error("You need to specify at least one role to run this action");
  }
  if (!hasAnyAuthorizedRole(requiredRoles, context)) {
    throw Error("You don't have the required roles to run this action");
  }
  const missingRequiredFields = requiredFields
    ? requiredFields.reduce(missingFieldsReducer(row), [])
    : [];
  if (missingRequiredFields.length > 0) {
    throw new Error(
      `${
        missingRequiredFields.length === 1
          ? `${missingRequiredFields[0]} field is`
          : `${missingRequiredFields.join(", ")} fields are`
      } required and missing from this row`
    );
  }
  return true;
};

export default validateAction;
