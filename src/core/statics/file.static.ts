import moment from 'moment';
import multer from 'multer';
import * as path from 'path';
import * as _ from 'lodash';
import {messageCode} from '../constants';
import * as logger from '../utils/logger.util';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/../../public`);
  },
  filename: (req, file, cb) => {
    const extension = file.originalname.substr(
      file.originalname.lastIndexOf('.'),
    );
    cb(
      null,
      `group_${moment(new Date()).format('YYYYMMDDHHmmss')}${extension}`,
    );
  },
});

function createMulter({allowFileTypes, maxFileSize}: any) {
  return multer({
    storage,
    fileFilter: (req, file, cb) => {
      if (maxFileSize && _.round(file.size / 1024) >= maxFileSize) {
        cb(new Error(messageCode.EBT034('2 MB')));
      }

      if (allowFileTypes) {
        // Check ext
        const extname = allowFileTypes.test(
          path.extname(file.originalname).toLowerCase(),
        );
        // Check mimetype
        const mimetype = allowFileTypes.test(file.mimetype);

        if (mimetype && extname) {
          return cb(null, true);
        }
        cb(new Error(messageCode.EBT033('CSV')));
      }
    },
  });
}

export const importGroup = createMulter({
  allowFileTypes: /csv/,
  maxFileSize: 2 * 1024,
});
