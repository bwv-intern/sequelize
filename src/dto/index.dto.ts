import {ImportModel} from './group.dto';
import {
  CreatedModel,
  ListModel,
  LoginModel,
  UpdatedModel,
  UserModel,
} from './user.dto';

// User Model

export class User extends UserModel {}

export class Login extends LoginModel {}

export class SearchDTO extends ListModel {}

export class CreatedDTO extends CreatedModel {}

export class UpdatedDTO extends UpdatedModel {}

// Group DTO

export class ImportDTO extends ImportModel {}
