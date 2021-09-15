'use strict';

const TIMEOUT_COMMON = 1000/30;
const TIMEOUT_GROUP_CHAT = 3000;
const TIMEOUT_PRIVATE_CHAT = 1000;
const CHAT_ID_COMMON = '$COMMON-DELAY';


function delay (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const lastSends = {};

function createMethod(saved) {
    return async function (chat_id) {
       await delayOutput(CHAT_ID_COMMON);
       await delayOutput(chat_id);
       return saved.apply(this, arguments);
    };
};

module.exports = function (Telegram) {
    Telegram.prototype.sendMessage = createMethod(Telegram.prototype.sendMessage);
    Telegram.prototype.forwardMessage = createMethod(Telegram.prototype.forwardMessage)
    Telegram.prototype.sendPhoto = createMethod(Telegram.prototype.sendPhoto)
    Telegram.prototype.sendAudio = createMethod(Telegram.prototype.sendAudio)
    Telegram.prototype.sendDocument = createMethod(Telegram.prototype.sendDocument)
    Telegram.prototype.sendSticker = createMethod(Telegram.prototype.sendSticker)
    Telegram.prototype.sendVideo = createMethod(Telegram.prototype.sendVideo)
    Telegram.prototype.sendVoice = createMethod(Telegram.prototype.sendVoice)
    Telegram.prototype.sendLocation = createMethod(Telegram.prototype.sendLocation)
    Telegram.prototype.sendVenue = createMethod(Telegram.prototype.sendVenue)
    Telegram.prototype.sendContact = createMethod(Telegram.prototype.sendContact)
    Telegram.prototype.sendChatAction = createMethod(Telegram.prototype.sendChatAction)
};


function isGroupChat(chat_id) {
    return chat_id < 0;
};

async function delayOutput(chat_id) {
    const now = new Date();
    const TIMEOUT = getChatTimeout(chat_id);
    const lastSend = lastSends[chat_id] || addMilliseconds(now, -TIMEOUT);
    const time = now - lastSend;    
    if (time < TIMEOUT) {
        const timeout = TIMEOUT - time;
        lastSends[chat_id] = addMilliseconds(lastSend, TIMEOUT);
        await delay(timeout);
    } else {
        lastSends[chat_id] = now;
    } 
};

function addMilliseconds(date, ms)  {
    const result = new Date(date);
    result.setMilliseconds(result.getMilliseconds() + ms);
    return result;
  };

function getChatTimeout(chat_id) {
    if (chat_id === CHAT_ID_COMMON)  {
        return TIMEOUT_COMMON;
    } else {
        return isGroupChat(chat_id) ? TIMEOUT_GROUP_CHAT : TIMEOUT_PRIVATE_CHAT;
    }   
};




