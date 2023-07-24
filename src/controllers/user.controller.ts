import * as logger from '../core/utils/logger.util';
import {Request, Response} from 'express';
import * as userService from '../services/user.service';
import {SearchDTO} from '../dto/index.dto';
import * as _ from 'lodash';
import {
  formatToString,
  getCurrentSystemDatetime,
} from '../core/utils/common.util';
import dataExport from 'json2csv';
const jsonExport:any = dataExport.Parser;

export const listUser = async (req: Request, res: Response) => {
  try {
    // const check = await userService.checkOne(Number(req.user.id));
    // if (check == null) {
    //   res.redirect('/logout');
    //   return true;
    // } else {
    //   req.user.destroy();
    //   (req.session as Express.Session).user = {
    //     ...check,
    //     log: 0,
    //   };
    // }
    const searchDTO: SearchDTO = {
      name: req.query.name as string,
      startedDateFrom: req.query.startedDateFrom as string,
      startedDateTo: req.query.startedDateTo as string,
    };

    let messageDelete = {} || undefined;
    if ((req.session as Express.Session).consumeSession) {
      messageDelete = {
        type: (req.session as Express.Session).consumeSession.type,
        content: (req.session as Express.Session).consumeSession.content,
      };
      delete (req.session as Express.Session).consumeSession;
    } else {
      messageDelete = undefined;
    }

    if (
      req.query.username == undefined &&
      req.query.startedDateFrom == undefined &&
      req.query.startedDateTo == undefined
    ) {
      res.render('user/list', {
        layout: 'layout/defaultLayout',
        user: '',
        totalCount: '',
        query: '',
        message: messageDelete,
      });
      return;
    }
    let offset = '0';
    if (req.query.offset) {
      offset = String(req.query.offset);
    }
    let pageLine = '10';
    if (req.query.pageLine) {
      pageLine = String(req.query.pageLine);
    }

    const value = await userService.listUser(searchDTO, pageLine, offset);
    const arr = _.map(value.list, (item: any) => {
      item.startedDate = formatToString(item.startedDate, 'DD/MM/YYYY');
      return {
        startedDate: item.startedDate,
        id: item.id,
        name: item.name,
        groupName: item.groupName,
        email: item.email,
        positionId:
          item.positionId == 0
            ? 'Director'
            : item.positionId == 1
            ? 'Group Leader'
            : item.positionId == 2
            ? 'Leader'
            : item.positionId == 3
            ? 'Member'
            : '',
      };
    });
    res.render('user/list', {
      layout: 'layout/defaultLayout',
      user: arr,
      totalCount: value.count,
      query: req.query,
    });
  } catch (error) {
    logger.logInfo(req, '...');
  }
};