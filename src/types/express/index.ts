/**
 * Custom definition for Express.Request
 */
import {IMessage} from '../../core/constants';
import * as models from '../../dto/index.dto';

declare global {
  namespace Express {
    // tslint:disable-next-line:interface-name
    interface Request {
      user: Partial<models.User> & {
        token?: {
          accessToken: string;
          refreshToken: string;
        };
        isAuthorized: boolean;
        getServiceOption(): {
          endpoint: string;
          accessToken?: string;
          refreshToken?: string;
          storeToken?(token: {accessToken: string; refreshToken: string}): void;
        };
        destroy(): void;
      };
      consumeSession<X>(): {formData?: X; message?: IMessage};
    }
  }
}
