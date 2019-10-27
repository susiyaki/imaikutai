const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./going-now-e954f-firebase-adminsdk-jef7s-95dd53243f.json");
const uuid = require("uuid/v4");
const _ = require("lodash");
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const db = admin.firestore();
const locationId = "asia-northeast1";

// refs
const storesRef = db.collection("Stores");
const enterAndLeavesRef = db.collection("EnterAndLeaves");

exports.insertSeedsToStores = functions
  .region(locationId)
  .https.onRequest((req, res) => {
    console.log('exports.insertSeedsToStores start');
    const batch = db.batch();

    const count = 10;

    const latMax = 33.597856;
    const latMin = 33.578032;
    const lngMax = 130.433399;
    const lngMin = 130.392072;

    // TODO: 小数点第6位まで
    const randRange = (min, max) =>
      Math.floor((Math.random() * (max - min + 1) + min) * 1000000) / 1000000;;

    _.times(count, i => {
      const data = {
        name: `屋台${i + 1}`,
        location: {
          lat: randRange(latMin, latMax),
          lng: randRange(lngMin, lngMax)
        }
      };

      batch.set(storesRef.doc(), data);
    });
    console.log('exports.insertSeedsToStores end');
    return batch
      .commit()
      .then(() => res.status(200).send("success created seed."))
      .catch(e => res.status(500).send("faild created seed."));
  });

exports.insertSeedsToEnterAndLeave = functions
  .region(locationId)
  .https.onRequest(async (req, res) => {
    const batch = db.batch();
    const count = 500;

    const randRange = (min, max) =>
      Math.floor(Math.random() * (max - min + 1) + min);

    const storeIds = await storesRef
      .get()
      .then(querySnapshot => {
        let result = [];
        querySnapshot.forEach(doc => {
          result.push(doc.id);
        });
        return result;
      })
      .catch(e => console.log(e.message));
    // 第一引数分繰り返し
    _.times(count, () => {
      //seedで入れた店舗をランダムでどれか取得するコード追加
      const year = Math.floor(Math.random() * (2019 + 1 - 2017)) + 2017;
      const month = Math.floor(Math.random() * (12 + 1 - 1)) + 1;
      const day = Math.floor(Math.random() * (30 + 1 - 1)) + 1;
      const hour = Math.floor(Math.random() * (23 + 1 - 0)) + 0;
      const min = Math.floor(Math.random() * (60 + 1 - 1)) + 1;
      const sec = Math.floor(Math.random() * (60 + 1 - 1)) + 1;
      const date = new Date(year, month, day, hour, min, sec);
      const l_min = Math.floor(Math.random() * (150 + 1 - 30)) + 30;
      let l_date = new Date(date.getTime());
      l_date.setMinutes(l_date.getMinutes() + l_min);
      l_date = new Date(l_date);

      const data = {
        userId: uuid(),
        storeId: storeIds[randRange(0, storeIds.length - 1)],
        enteringTime: date,
        leavingTime: l_date
      };
      batch.set(enterAndLeavesRef.doc(), data);
    });

    return batch
      .commit()
      .then(() => res.status(200).send("success created seed."))
      .catch(e => res.status(500).send("faild created seed."));
  });

// 後で名前変える
exports.AggregateStayingTime= functions
   .region(locationId)
   .https
   .onRequest(async (req, res) => {
     const enterAndLeaves = await getAllEnterAndLeaves();
 
     // データ集計API叩く
     console.log(enterAndLeaves)
     res.send(enterAndLeaves)
     //
     // 集計データを元に込具合を更新
   });
//exports.AggregateStayingTime= functions
//   .region(locationId)
//   .pubsub.topic("getAllEnterAndLeaves")
//   .onPublish(async message => {
//     const enterAndLeaves = await getAllEnterAndLeaves();
// 
//     // データ集計API叩く
//     console.log(enterAndLeaves)
//     //
//     // 集計データを元に込具合を更新
//   });


const getAllEnterAndLeaves = () => {
  let result = [];

  enterAndLeavesRef
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let data = doc.data();
        data.enteringTime = data.enteringTime.toDate();
        data.liavingTime = data.leavingTime.toDate();

        result.push(data);
      });
      return result;
    })
    .catch(e => console.log(e.message));
};


