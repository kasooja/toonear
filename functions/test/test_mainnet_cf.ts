const dotenv = require("dotenv");
dotenv.config();
import * as mainnet_cf from "../src/mainNet_cf";
import * as admin from "firebase-admin";

const adminConfig = JSON.parse(String(process.env.FB_APP_CONFIG));
// set google app creds for admin in local env
admin.initializeApp(adminConfig);

// # var serviceAccount = require("path/to/serviceAccountKey.json");
// # admin.initializeApp({
// #   credential: admin.credential.cert(serviceAccount)
// # });

(async () => {
  console.log("test starting..");
  try {
    mainnet_cf.autocompound(admin);
  } catch (err) {
    console.error(err);
  }
})();
