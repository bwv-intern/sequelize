import {User} from '../models/user';
import {Group} from '../models/group';
import {hashPassword} from '../core/utils/bcrypt.util';
import {formatToStringN} from '../core/utils/common.util';
import {SearchDTO} from '../dto/index.dto';
import * as _ from 'lodash';
import sequelize from '../core/connection';

export async function listUser(
  searchDTO: SearchDTO,
  pageLine: string | number,
  offset: string | number,
) {
  let str = 'SELECT user.*, `group`.name as groupName FROM user ';
  str += 'LEFT JOIN `group` ';
  str += 'ON user.id = `group`.id AND `group`.deleted_date IS NULL ';
  str += `where `;
  if (searchDTO.name) {
    str += `user.name like '%${searchDTO.name}%' AND `;
  }
  if (searchDTO.startedDateFrom && searchDTO.startedDateTo) {
    str += `user.started_date >= '${formatToStringN(searchDTO.startedDateFrom, 'DD/MM/YYYY')}' AND user.started_date <= '${formatToStringN(searchDTO.startedDateTo, 'DD/MM/YYYY')}' AND `;
  } else if (searchDTO.startedDateFrom) {
    str += `user.started_date >= '${formatToStringN(searchDTO.startedDateFrom, 'DD/MM/YYYY')}' AND `;
  } else if (searchDTO.startedDateTo) {
    str += `user.started_date <= '${formatToStringN(searchDTO.startedDateTo, 'DD/MM/YYYY')}' AND `;
  }
  str += `user.deleted_date IS NULL `;
  str += `GROUP BY user.id `;
  str += `ORDER BY user.name ASC, user.started_date ASC, user.id ASC `;
  str += `LIMIT ${offset}, ${pageLine} `;

  const list = await sequelize.query(str);
  return {list, count: 0};
}