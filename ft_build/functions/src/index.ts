import * as functions from "firebase-functions";

import { functionName, triggerPath } from "./functionConfig";
import onWrite from "./onWrite";
//import onCall from "./onCall";
export const FT = {
  [functionName]: functions.firestore.document(triggerPath).onWrite(onWrite),
  // [`${functionName}_onCall`]: functions.https.onCall(onCall),
};
