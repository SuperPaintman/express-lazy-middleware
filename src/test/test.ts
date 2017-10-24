'use strict';
/** Imports */
import * as Express from 'express';
import * as request from 'supertest-as-promised';

import * as _       from 'lodash';
import { expect }   from 'chai';

import lazy         from '..';


describe('lazy()', function () {
  let app: Express.Application;

  beforeEach(() => {
    app = Express();
  });


  it('should works', () => {
    app.get('/', lazy(() => (req, res, next) => {
      res.send('Lazy!');
    }));

    return request(app)
      .get('/')
      .expect(200)
      .expect('Lazy!');
  });

  it('should works when a promise is returned', async () => {
    let called = false;

    app.get('/', lazy(async (): Promise<Express.RequestHandler> => {
      called = true;

      await new Promise((resolve, reject) => {
        setTimeout(resolve, 5);
      });

      return (req, res, next) => {
        res.send('Lazy and async!');
      };
    }));

    expect(called).to.be.false;

    await request(app)
      .get('/')
      .expect(200)
      .expect('Lazy and async!');

    expect(called).to.be.true;
  });

  it('should init middleware once', async () => {
    let calls = 0;

    app.get('/', lazy(() => {
      calls++;

      return (req, res, next) => {
        res.send('Lazy!');
      };
    }));

    await Promise.all(_.times(10, () => (
      request(app)
        .get('/')
        .expect(200)
        .expect('Lazy!')
    )));

    expect(calls).to.equal(1);
  });

  it('should init async middleware once', async () => {
    let calls = 0;

    app.get('/', lazy(async (): Promise<Express.RequestHandler> => {
      calls++;

      await new Promise((resolve, reject) => {
        setTimeout(resolve, 5);
      });

      return (req, res, next) => {
        res.send('Lazy and async!');
      };
    }));

    await Promise.all(_.times(10, () => (
      request(app)
        .get('/')
        .expect(200)
        .expect('Lazy and async!')
    )));

    expect(calls).to.equal(1);
  });

  it('it should throw errors to the `next()` on init');
});
