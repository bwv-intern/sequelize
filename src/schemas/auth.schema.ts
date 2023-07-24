import Joi from 'joi';
import {messageCode} from '../core/constants';

const expEmail = /^[\w-\.+*&^%$/()#!_=`~;:'"?<>|\[{}\]]+@([\w-\.+*&^%$/()#!_=`~;:'"?<>|\[{}\]]+\.)+[\w-]{2,5}$/;
export const loginSchema = Joi.object({
  email: Joi.string()
    .pattern(expEmail)
    .required()
    .messages({
      'string.pattern.base': messageCode.EBT005,
      'string.empty': messageCode.EBT001('Email'),
    }),
  password: Joi.string()
    .required()
    .messages({
      'string.empty': messageCode.EBT001('Password'),
    }),
});
