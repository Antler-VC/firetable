import React, { useState, useEffect } from "react";
import clsx from "clsx";
import _isNil from "lodash/isNil";
import _findIndex from "lodash/findIndex";

import { Drawer, Fab } from "@material-ui/core";
import ChevronIcon from "@material-ui/icons/KeyboardArrowLeft";
import ChevronUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ChevronDownIcon from "@material-ui/icons/KeyboardArrowDown";

import Form, { Field } from "./Form";
import ErrorBoundary from "components/ErrorBoundary";

import { useStyles } from "./useStyles";
import { useFiretableContext } from "contexts/firetableContext";
import { FieldType } from "constants/fields";

export const DRAWER_WIDTH = 600;
export const DRAWER_COLLAPSED_WIDTH = 36;

export default function SideDrawer() {
  const classes = useStyles();
  const {
    tableState,
    selectedCell,
    setSelectedCell,
    sideDrawerOpen: open,
    setSideDrawerOpen: setOpen,
    dataGridRef,
  } = useFiretableContext();

  const disabled = !selectedCell || _isNil(selectedCell.row);
  useEffect(() => {
    if (disabled && setOpen) setOpen(false);
  }, [disabled]);

  const handleNavigate = (direction: "up" | "down") => () => {
    if (!tableState?.rows) return;

    let row = selectedCell!.row;
    if (direction === "up" && row > 0) row -= 1;
    if (direction === "down" && row < tableState.rows.length - 1) row += 1;

    setSelectedCell!(cell => ({ ...cell, row }));

    const idx = _findIndex(tableState?.columns, ["key", selectedCell!.column]);
    dataGridRef?.current?.selectCell({ rowIdx: row, idx });
  };

  // Map columns to form fields
  const fields = tableState?.columns?.map(column => {
    const field: Field = {
      type: column.type,
      name: column.key,
      label: column.name,
    };

    switch (column.type) {
      case FieldType.longText:
        field.fieldVariant = "long";
        break;

      case FieldType.email:
        field.fieldVariant = "email";
        break;

      case FieldType.phone:
        field.fieldVariant = "phone";
        break;

      case FieldType.number:
        field.fieldVariant = "number";
        break;

      case FieldType.url:
        field.fieldVariant = "url";
        break;

      case FieldType.singleSelect:
      case FieldType.multiSelect:
        field.options = column.options;
        break;

      case FieldType.connectTable:
        field.collectionPath = column.collectionPath;
        field.config = column.config;
        break;

      case FieldType.action:
        field.callableName = column.callableName;
        break;

      default:
        break;
    }

    return field;
  });

  return (
    <div className={clsx(open && classes.open, disabled && classes.disabled)}>
      <Drawer
        variant="permanent"
        anchor="right"
        className={classes.drawer}
        classes={{
          paperAnchorDockedRight: classes.paper,
          paper: clsx({
            [classes.paperOpen]: open,
            [classes.paperClose]: !open,
          }),
        }}
      >
        <ErrorBoundary>
          <div className={classes.drawerContents}>
            {open && fields && selectedCell && (
              <Form
                fields={fields}
                values={tableState?.rows[selectedCell.row] ?? {}}
              />
            )}
          </div>
        </ErrorBoundary>
      </Drawer>

      <div className={classes.navFabContainer}>
        <Fab
          classes={{ root: classes.fab, disabled: classes.disabled }}
          color="secondary"
          size="small"
          disabled={disabled || !selectedCell || selectedCell.row <= 0}
          onClick={handleNavigate("up")}
        >
          <ChevronUpIcon />
        </Fab>

        <Fab
          classes={{ root: classes.fab, disabled: classes.disabled }}
          color="secondary"
          size="small"
          disabled={
            disabled ||
            !tableState ||
            !selectedCell ||
            selectedCell.row >= tableState.rows.length - 1
          }
          onClick={handleNavigate("down")}
        >
          <ChevronDownIcon />
        </Fab>
      </div>

      <div className={classes.drawerFabContainer}>
        <Fab
          classes={{ root: classes.fab, disabled: classes.disabled }}
          color="secondary"
          disabled={disabled}
          onClick={() => {
            if (setOpen) setOpen(o => !o);
          }}
        >
          <ChevronIcon className={classes.drawerFabIcon} />
        </Fab>
      </div>
    </div>
  );
}
