import { ServerResponse, IncomingMessage } from "http";

export interface IRouter {
  [key: string]: (reqQuery: { [key: string]: string }, req: IncomingMessage, res: ServerResponse) => void
};