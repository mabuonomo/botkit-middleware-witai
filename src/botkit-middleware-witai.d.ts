import { Wit } from 'node-wit';
import { NextFunction } from 'express';
import { IMessageWit } from './types/IMessageWit';
import { IConfig } from './types/IConfig';
import { IBotKitWit } from './types/IBotKitWit';
export declare class BotKitWit implements IBotKitWit {
    config: IConfig;
    client: Wit;
    constructor(config: IConfig);
    receive(bot: any, message: IMessageWit, next: NextFunction): void;
    heard(tests: Array<string>, message: IMessageWit): boolean;
}
