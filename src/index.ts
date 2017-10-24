'use strict';
/** Imports */
import { RequestHandler } from 'express';


/** Interfaces */
export type ILoader = (() => RequestHandler)
                    | (() => Promise<RequestHandler>);


/**
 * Express lazy middleware initialize. The `loader` function will be called
 * only once.
 *
 * @export
 * @param {ILoader} loader
 * @returns {RequestHandler}
 *
 * @example
 *
 * ```js
 * app.get('/session', lazy(() => require('./session')));
 *
 * // or with promise
 *
 * app.get('/version', lazy(async () => {
 *   await new Promise((resolve, reject) => {
 *     setTimeout(resolve, 5);
 *   });
 *
 *   return require('./session');
 * }));
 * ```
 */
export default function lazy(loader: ILoader): RequestHandler {
  let inited = false;
  let handler: RequestHandler;
  let initPromise: Promise<RequestHandler>;

  return function middleware(this: any, req, res, next) {
    if (inited) {
      return handler.call(this, req, res, next);
    }

    if (initPromise !== undefined) {
      return initPromise
        .then(() => {
          return handler.call(this, req, res, next);
        });
    }

    initPromise = new Promise<RequestHandler>((resolve, reject) => {
      resolve(loader());
    });

    return initPromise
      .then((mod) => {
        inited = true;
        handler = mod;

        return handler.call(this, req, res, next);
      })
      .catch((err) => next(err));
  };
}
