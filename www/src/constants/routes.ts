export enum routes {
  home = "/",
  auth = "/auth",
  impersonatorAuth = "/impersonatorAuth",
  signOut = "/signOut",

  table = "/table",

  tableGroup = "/tableGroup",

  tableWithId = "/table/:id",
  subTable = "/table/:collection/:rowId/subTables/:subCollection/:label",

  arrayTable = "/table/:collection/:rowId/arrayTable/:columnKey/:label",
  tableGroupWithId = "/tableGroup/:id",
  grid = "/grid",
  gridWithId = "/grid/:id",
  editor = "/editor",
}

export default routes;
