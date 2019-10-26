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
    const count = 10;

    // 第一引数分繰り返し
      _.times(count, () => {
	//seedで入れた店舗をランダムでどれか取得するコード追加
	var year = Math.floor( Math.random() * (2019 + 1 - 2017) ) + 2017 ;
	var month = Math.floor( Math.random() * (12 + 1 - 1) ) + 1 ;
	var day = Math.floor( Math.random() * (30 + 1 - 1) ) + 1 ;
	var hour = Math.floor( Math.random() * (23 + 1 - 0) ) + 0 ;
	var min = Math.floor( Math.random() * (60 + 1 - 1) ) + 1 ;
	var sec = Math.floor( Math.random() * (60 + 1 - 1) ) + 1 ;
	var date = new Date( year, month, day, hour, min, sec ) ;
	var l_min = Math.floor( Math.random() * (150 + 1 - 30) ) + 30 ;
	var l_date = new Date(date.getTime()) ;
	l_date.setMinutes(l_date.getMinutes() - l_min) ;
	l_date = new Date(l_date);

	var data = {
          userId: uuid(),
	  storeId: ,
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
