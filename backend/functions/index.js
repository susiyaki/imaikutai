const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./going-now-e954f-firebase-adminsdk-jef7s-95dd53243f.json");
const uuid = require("uuid/v1");
const _ = require("lodash");
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const db = admin.firestore();
const locationId = "asia-northeast1";

// refs
const enterAndLeavesRef = db.collection("EnterAndLeaves");

exports.insertSeedsToEnterAndLeave = functions
  .region(locationId)
  .https.onRequest((req, res) => {
    const batch = db.batch();

    const dateCount = 5;
    const logCount = 10;

    // 第一引数分繰り返し
    _.times(dateCount, () => {
      const log = [];

      _.times(logCount, () => {
        log.push({
          userId: uuid(),
          enteringTime: "ランダムな時間",
          leavingTime: "ランダムな時間"
        });
      });

      const data = {
        date: "日付を連番で",
        log
      };
      batch.set(enterAndLeavesRef.doc(), data);
    });

    return batch
      .commit()
      .then(() => console.log("inserted seeds."))
      .catch(e => console.log(e.message));
  });
