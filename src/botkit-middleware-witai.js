"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_wit_1 = require("node-wit");
class BotKitWit {
    constructor(config) {
        this.config = config;
        this.client = new node_wit_1.Wit({ accessToken: config.token });
    }
    receive(bot, message, next) {
        if (message.text) {
            this.client.message(message.text, {})
                .then((data) => {
                message.entities = data.entities;
                message.response = JSON.stringify(data);
                next();
            }).catch((error) => {
                next(error);
            });
        }
        else if (message.attachments) {
            message.intents = [];
            next();
        }
        else {
            next();
        }
    }
    ;
    heard(tests, message) {
        let keys = Object.keys(message.entities);
        while (keys.length > 0) {
            let key = keys.shift();
            let entity = message.entities[key].shift();
            let confidence = entity.confidence;
            if (tests.find((value) => value == key) &&
                confidence >= this.config.minimum_confidence) {
                return true;
            }
        }
        return false;
    }
    ;
}
exports.BotKitWit = BotKitWit;
