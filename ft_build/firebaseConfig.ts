// Initialize Firebase Admin
import * as admin from "firebase-admin";

// const projectId = "antler-vc";
// console.log(`Running on ${projectId}`);
// var serviceAccount = require(`./${projectId}-firebase.json`);
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: `https://${projectId}.firebaseio.com`,
//   storageBucket: `${projectId}.appspot.com`,
// });

admin.initializeApp();
const db = admin.firestore();
const auth = admin.auth();

db.settings({ timestampsInSnapshots: true, ignoreUndefinedProperties: true });

export { db, admin, auth };
