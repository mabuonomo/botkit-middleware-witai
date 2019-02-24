export interface IMiddleware {
    capture(bot: any, message: any, convo: any, next: () => void): void;
    heard(bot: any, message: any, next: () => void): void;
    receive(bot: any, message: any, next: () => void): void;
    send(bot: any, message: any, next: () => void): void;
}
