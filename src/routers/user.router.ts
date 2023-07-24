/**
 * User Router
 */
import {Router} from 'express';
import * as userController from '../controllers/user.controller';

const userRouter = Router();

userRouter.get('/user', userController.listUser);
// userRouter.get('/user/form/:id', userController.viewAddEditDeleteUser);
// userRouter.post('/user/form/:id', userController.updatedUser);
// userRouter.get('/user/form', userController.viewAddEditDeleteUser);
// userRouter.post('/user/form', userController.createdUser);
// userRouter.get('/user/exportCSV', userController.exportCSV);
// userRouter.post('/user/:id/delete', userController.deletedUser);

export default userRouter;
