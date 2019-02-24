"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_wit_1 = require("node-wit");
module.exports = function (config) {
    if (!config || !config.token) {
        throw new Error('No wit.ai API token specified');
    }
    if (!config.minimum_confidence) {
        config.minimum_confidence = 0.5;
    }
    var client = new node_wit_1.Wit({ accessToken: config.token });
    var middleware;
    middleware.receive = function (bot, message, next) {
        if (message.text) {
            client.message(message.text, {})
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
    };
    middleware.hears = function (tests, message) {
        let keys = Object.keys(message.entities);
        while (keys.length > 0) {
            let key = keys.shift();
            let entity = message.entities[key].shift();
            let confidence = entity.confidence;
            if (tests.find((value) => value == key) &&
                confidence >= config.minimum_confidence) {
                return true;
            }
        }
        return false;
    };
    return middleware;
};
//# sourceMappingURL=botkit-middleware-witai.js.map