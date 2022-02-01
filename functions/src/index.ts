import * as functions from "firebase-functions";
import * as mainnet_cf from "./mainNet_cf";
import { EventContext } from "firebase-functions";
import { RuntimeOptions } from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const CF_RUNTIME_OPTS_LIGHT_1: RuntimeOptions = {
  timeoutSeconds: 120,
  memory: "128MB",
};

function createCronCF(schedule: string, runtime_opts: any, task: any) {
  return functions
    .runWith(runtime_opts)
    .pubsub.schedule(schedule)
    .onRun(async (context: EventContext) => {
      task(admin);
    });
}

// ***************************TESTNET*************************************

// ***************************MAINNET*************************************
exports.autocompound_aurora_validator_staking_rewards = createCronCF(
  "every 12 hours",
  CF_RUNTIME_OPTS_LIGHT_1,
  mainnet_cf.autocompound
);
