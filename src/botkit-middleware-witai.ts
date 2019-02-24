import { Wit } from 'node-wit';
import { NextFunction } from 'express';
import { IMessageWit } from './types/IMessageWit';
import { IConfig } from './types/IConfig';
import { Controller } from 'botkit';
import { IMiddleware } from './types/IMiddleware';

module.exports = function (config: IConfig) {
    if (!config || !config.token) {
        throw new Error('No wit.ai API token specified');
    }

    if (!config.minimum_confidence) {
        config.minimum_confidence = 0.5;
    }

    var client = new Wit({ accessToken: config.token });

    var middleware: IMiddleware;

    middleware.receive = function (bot, message: IMessageWit, next: NextFunction) {
        // Only parse messages of type text
        if (message.text) {
            client.message(message.text, {})
                .then((data) => {
                    message.entities = data.entities;
                    message.response = JSON.stringify(data);
                    next();
                }).catch((error) => {
                    next(error);
                });
        } else if (message.attachments) {
            message.intents = [];
            next();
        } else {
            next();
        }
    };

    middleware.heard = function (tests: Array<string>, message: IMessageWit) {
        let keys = Object.keys(message.entities);
        while (keys.length > 0) {
            let key: string = keys.shift();
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