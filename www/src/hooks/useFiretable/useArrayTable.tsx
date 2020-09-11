import { db } from "../../firebase";

import Button from "@material-ui/core/Button";
import React, { useEffect, useReducer, useContext } from "react";
import equals from "ramda/es/equals";
import firebase from "firebase/app";
import { FireTableFilter, FiretableOrderBy } from ".";
import { SnackContext } from "../../contexts/snackContext";
import { cloudFunction } from "../../firebase/callables";

import useDoc from "../useDoc";
const CAP = 1000; // safety  paramter sets the  upper limit of number of docs fetched by this hook
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

const tableReducer = (prevState: any, newProps: any) => {
  return { ...prevState, ...newProps };
};
const tableInitialState = {
  rows: [],
  prevFilters: null,
  prevPath: null,
  orderBy: [],
  prevOrderBy: null,
  path: null,
  filters: [],
  prevLimit: 0,
  limit: 50,
  loading: true,
  cap: CAP,
};

const useArrayTable = () => {
  const snack = useContext(SnackContext);

  const [tableState, dispatchTable] = useDoc({});

  const filterReducer = (acc, curr) => {
    if (curr.operator === "==") {
      return { ...acc, [curr.key]: curr.value };
    } else return acc;
  };
  /**  creating new array Item/row
   *  @param data(optional: default will create empty row)
   */
  const addRow = async (data?: any) => {
    const valuesFromFilter = tableState.filters.reduce(filterReducer, {});

    const docData = {
      ...valuesFromFilter,
      ...data,
    };
    try {
    } catch (error) {
      if (error.code === "permission-denied") {
        snack.open({
          severity: "error",
          message: "You don't have permissions to add a new row",
          duration: 3000,
          position: { vertical: "top", horizontal: "center" },
        });
      }
    }
  };

  const deleteRow = (index) => {
    console.log(index);
  };
  const tableActions = {
    deleteRow,
    addRow,
    dispatch: dispatchTable,
  };
  return [tableState, tableActions];
};
export default useArrayTable;
