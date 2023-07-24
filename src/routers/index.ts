/**
 * Main Router
 */
import {Router} from 'express';
import {notFound as notFoundHandler} from '../controllers/error.controller';
import auth from '../core/middlewares/authentication.middleware';
import sessionMiddleWare from '../core/middlewares/session.middleware';
import userMiddleware from '../core/middlewares/user.middleware';
import authRouter from './auth.router';
import userRouter from './user.router';
// import groupRouter from './group.router';
import viewHelper from '../core/middlewares/viewHelper.middleware';

const router = Router();

router.use(sessionMiddleWare);
router.use(userMiddleware);
router.use('/', authRouter);
router.use(auth);
router.use(viewHelper);

router.use('/', userRouter);
// router.use('/', groupRouter);

// 404 error
router.use(notFoundHandler);

export default router;
