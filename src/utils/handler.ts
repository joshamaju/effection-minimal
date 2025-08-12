import type { Operation, Scope } from "effection";
import type { Handler, NextFunction, Request, Response } from "express";

export function create_handler(scope: Scope) {
  return <
    P,
    ResBody,
    ReqBody,
    ReqQuery,
    LocalsObj extends Record<string, any> = Record<string, any>,
  >(
    fn: (
      req: Request<P, ResBody, ReqBody, ReqQuery, LocalsObj>,
      res: Response<ResBody, LocalsObj>,
      next: NextFunction,
    ) => Operation<any>,
  ): Handler => {
    return async (req, res, next) => {
      // @ts-expect-error
      const task = scope.run(() => fn(req, res, next));

      try {
        await task;
      } catch (e) {
        console.error("operation error: ", e);
        next(e);
      }
    };
  };
}

export function handler(fn: (req: Request, res: Response) => Operation<any>) {
  return fn;
}
