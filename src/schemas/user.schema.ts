import Joi from 'joi';
import {messageCode} from '../core/constants';

const expPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
const expEmail = /^[\w-\.+*&^%$/()#!_=`~;:'"?<>|\[{}\]]+@([\w-\.+*&^%$/()#!_=`~;:'"?<>|\[{}\]]+\.)+[\w-]{2,5}$/;

export const addUserSchema = (currentEmail: string, currentName: string) =>
  Joi.object({
    name: Joi.string()
      .required()
      .max(100)
      .messages({
        'string.empty': messageCode.EBT001('User Name'),
        'string.max': messageCode.EBT002('User Name', '100', currentName),
      }),
    email: Joi.string()
      .required()
      .max(255)
      .pattern(expEmail)
      .messages({
        'string.empty': messageCode.EBT001('Email'),
        'string.pattern.base': messageCode.EBT005,
        'string.max': messageCode.EBT002('Email', '255', currentEmail),
      }),
    groupId: Joi.number()
      .required()
      .messages({
        'string.empty': messageCode.EBT001('Group Id'),
      }),
    startedDate: Joi.date()
      .required()
      .messages({
        'string.empty': messageCode.EBT001('Started Date'),
      }),
    positionId: Joi.number()
      .required()
      .messages({
        'string.empty': messageCode.EBT001('Position Id'),
      }),
    password: Joi.string()
      .required()
      .pattern(expPassword)
      .messages({
        'string.empty': messageCode.EBT001('Password'),
        'string.pattern.base': messageCode.EBT023,
      }),
  });

export const editUserSchema = (currentEmail: string, currentName: string) =>
  Joi.object({
    name: Joi.string()
      .required()
      .max(100)
      .messages({
        'string.empty': messageCode.EBT001('User Name'),
        'string.max': messageCode.EBT002('User Name', '100', currentName),
      }),
    email: Joi.string()
      .pattern(expEmail)
      .max(255)
      .required()
      .messages({
        'string.empty': messageCode.EBT001('Email'),
        'string.pattern.base': messageCode.EBT005,
        'string.max': messageCode.EBT002('Email', '255', currentEmail),
      }),
    groupId: Joi.number()
      .required()
      .messages({
        'string.empty': messageCode.EBT001('Group Id'),
      }),
    startedDate: Joi.date()
      .required()
      .messages({
        'string.empty': messageCode.EBT001('Started Date'),
      }),
    positionId: Joi.number()
      .required()
      .messages({
        'string.empty': messageCode.EBT001('Position Id'),
      }),
    password: Joi.string()
      .allow('')
      .pattern(expPassword)
      .messages({
        'string.pattern.base': messageCode.EBT023,
      }),
  });
