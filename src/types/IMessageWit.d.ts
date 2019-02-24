import { Message } from "botkit";
export interface IMessageWit extends Message {
    entities: Array<string>;
    response: string;
    intents: Array<string>;
    attachments: any;
}
