import * as admin from "firebase-admin";

const projectId = "antler-vc";
console.log(`Running on ${projectId}`);
var serviceAccount = require(`./${projectId}-firebase.json`);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${projectId}.firebaseio.com`,
  storageBucket: `${projectId}.appspot.com`,
});
import { asyncExecute } from "./compiler/terminal";
import generateConfig from "./compiler";
import firebase from "firebase-admin";

const main = async (configPath) => {
  console.log("configPath:", configPath);

  let user: firebase.auth.UserRecord;
  const success = await generateConfig(configPath, user);

  console.log("generateConfig done");

  // await asyncExecute('nvm use 14',()=>{});
  // await asyncExecute(
  //   `cd functions; \
  //    yarn install`,
  //    ()=>{}
  // );

  // await asyncExecute(
  //   `cd functions; \
  //      yarn deployFT \
  //       --project ${projectId} \
  //       --only functions`,
  //       ()=>{}
  // );

  // console.log("build complete");
};

main("/_FIRETABLE_/settings/schema/founders");
