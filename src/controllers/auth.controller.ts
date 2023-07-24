// @ts-nocheck
/**
 * Login controller
 */
import {Request, Response} from 'express';
import {messageCode} from '../core/constants';
import * as authSerice from '../services/auth.service';
import {validate} from '../core/validation';
import {loginSchema} from '../schemas/auth.schema';
import {Login} from '../dto/index.dto';
import * as logger from '../core/utils/logger.util';
/**
 * GET login
 */
export const login = (req: Request, res: Response) => {
  res.render('login/index', {
    layout: 'layout/loginLayout',
    message: '',
    email: '',
  });
};

/**
 * POST login
 */
export const auth = async (req: Request, res: Response) => {
  try {
    // load a post by a given post id
    const value = validate<Login>(req.body, loginSchema);
    const user = await authSerice.verifyCredentials(value);

    if (!user) {
      // write log
      logger.logInfo(
        req,
        `Failed login attempt: name(${req.body.email || ''})`,
      );

      res.render('login/index', {
        layout: 'layout/loginLayout',
        email: req.body.email,
        message: messageCode.EBT016,
      });
      return;
    }

    req.user = user.dataValues;
    // save user info into session
    (req.session as Express.Session).user = {
      ...user,
      log: 0,
    };

    // write log
    if (user) {
      logger.logInfo(req, `User id(${user!.id}) logged in successfully.`);
    }

    // If [ログイン] clicked, then redirect to TOP page
    if (
      req.query.redirect !== undefined &&
      req.query.redirect.length! > 0 &&
      req.query.redirect !== '/user'
    ) {
      res.redirect(decodeURIComponent(req.query.redirect!.toString()));
      //res.redirect('/user');
    } else {
      res.redirect('/user');
    }
  } catch (err) {
    // write log
    logger.logInfo(req, `Failed login attempt: name(${req.body.email || ''})`);

    res.render('login/index', {
      layout: 'layout/loginLayout',
      email: req.body.email,
      message: err,
    });
  }
};

/**
 * GET logout
 */
export const logout = async (req: Request, res: Response) => {
  req.user.destroy();

  // write log
  logger.logInfo(req, 'User logged out successfully.');

  let redirectURL = '/login';
  if (req.query.redirect !== undefined) {
    redirectURL += `?redirect=${encodeURIComponent(
      req.query.redirect!.toString(),
    )}`;
  }
  //res.redirect(redirectURL);
  res.redirect('/login');
};
