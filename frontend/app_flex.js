'use strict';

// const line = require('@line/bot-sdk');
// const express = require('express');
// Contain everything in one file
// const quiz = require('./menu');
var arr = null;
$.ajax({
    'async': false,
    'global': false,
    'url': "/menu.json",
    'dataType': "json",
    'success': function (data) {
        arr = data;
    }
});

// load environment variables
require('dotenv').config();

// LINE Bot Setting
const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
};
const client = new line.Client(config);

// base URL for webhook server
const baseURL = process.env.BASE_URL;

// express
const app = new express();
const port = 3000;

// serve static files
app.use('/static', express.static('static'));

// constants
// QUIZ_START_MESSAGE initiates -> Integrate with Map
// Deprecate YATAI_START_MESSAGE -> Merge with MAP_MESSAGE
// /const YATAI_START_MESSAGE = 'すぐ入れる屋台おを探そう！';
const YATAI_MAP_MESSAGE = '地図で見ましょう！';
const YATAI_MENU_MESSAGE = 'メニューを見ましょう！';
// const POSTBACK_TYPE_ANSWER_QUESTION = 'QuestionAnswer';
// const POSTBACK_TYPE_NEXT_QUESTION = 'NextQuestion';
// const POSTBACK_TYPE_SHOW_QUIZ_RESULT = 'ShowQuizResult';


// LINE Bot webhook callback [POST only]
app.post('/linebot', line.middleware(config), (req, res) => {
    console.log('LINE Bot webhook callback handle function called!');
    if (req.body.destination) {
        console.log("Destination User ID: " + req.body.destination);
    }
    // req.body.events should be an array of events
    if (!Array.isArray(req.body.events)) {
        return res.status(500).end();
    }
    // handle each event
    Promise
        .all(req.body.events.map(handleEvent))
        .then(() => res.end())
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});

// handle TextMessage
function handleText(message, replyToken, event_source) {
    console.log('handleText function called!');
    const message_text = message.text;
    console.log('message text: ' + message_text);
    const user_id = event_source.userId;
    if (message_text === YATAI_START_MESSAGE) {
        const user_data = quiz.initializeMapsFor(user_id);
        return client.replyMessage(
            replyToken,
            q_message
        );
    } else {
        return replyText(replyToken, message.text);
    }
};

// callback function to handle a single event
function handleEvent(event) {
    if (event.replyToken && event.replyToken.match(/^(.)\1*$/)) {
        return console.log("Test hook recieved: " + JSON.stringify(event.message));
    }
    // handle event
    switch (event.type) {
        // handle message event
        case 'message':
            const message = event.message;
            switch (message.type) {
                // handle Text message
                case 'text':
                    return handleText(message, event.replyToken, event.source);
                // unknown message
                default:
                    replyText(replyToken, 'よく分かりませんでした');
            }
        // handle follow(友だち追加) event
        case 'follow':
            return replyText(event.replyToken, 'お友だち追加ありがとうございます！');
        // handle unfollow(ブロック) event
        case 'unfollow':
            return console.log(`Unfollowed this bot: ${JSON.stringify(event)}`);
        // handle join(グループ参加) event
        case 'join':
            return replyText(event.replyToken, `Joined ${event.source.type}`);
        // handle leave(グループ退室) event
        case 'leave':
            return console.log(`Left: ${JSON.stringify(event)}`);
        // handle Postback event
        case 'postback':
            return handlePostback(event);
        // unknown event
        default:
            throw new Error(`Unknown event: ${JSON.stringify(event)}`);
    }
};

// simple reply function
function replyText (token, texts) {
    texts = Array.isArray(texts) ? texts : [texts];
    return client.replyMessage(
        token,
        texts.map((text) => ({ type: 'text', text }))
    );
};

/*function handleText(message, replyToken, source) {
    switch (message.text) {
        case 'profile':
            !!!

        case 'confirm':
            return client.replyMessage(
                replyToken!!!
        case '
        }
}*/

// No longer needed, handled by the LINE Console
// Displays the restaurant information and
/* function loadYatai(message) {
    console.log('handleText function called!');
    const message_text = message.text;
    console.log('message text: ' + message_text);
    if(message_text === YATAI_START_MESSAGE) {
        return {

        }
    }
} */

// Beacon code !!!
/*
{
  "replyToken": "nHuyWiB7yP5Zw52FIkcQobQuGDXCTA",
  "type": "beacon",
  "timestamp": 1462629479859,
  "source": {
    "type": "user",
    "userId": "U4af4980629..."
  },
  "beacon": {
    "hwid": "d41d8cd98f",
    "type": "enter"
  }
}
*/

// run express server
app.listen(port, () => {
    console.log(`Server running on ${port}`)
});
