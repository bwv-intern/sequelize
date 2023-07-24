import {User} from '../models/user';
import {comparePassword} from '../core/utils/bcrypt.util';
import {Login} from '../dto/index.dto';
import * as _ from 'lodash';

export const verifyCredentials = async (loginDTO: Login) => {
  const foundUser = await User.findOne({
    where: {email: loginDTO.email, deletedDate: null},
  });

  if (!foundUser) {
    return null;
  }

  // validate password
  const passwordMatched = await comparePassword(
    loginDTO.password,
    foundUser!.password,
  );

  if (!passwordMatched) {
    return null;
  }

  const list = await User.findAll({
    where: {
      email: loginDTO.email,
      deletedDate: null,
    },
  });

  let countTmp = 0;
  for (const item of list) {
    const pwd = await comparePassword(loginDTO.password, item.password);
    if (pwd) {
      countTmp++;
    }
    if (countTmp >= 2) {
      break;
    }
  }

  if (countTmp >= 2) {
    return null;
  }

  return foundUser;
}
