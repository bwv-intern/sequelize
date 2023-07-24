export class UserModel {
  id: number;
  positionId: number;
  email: string;
  name: string;
  log: number;
}

export class LoginModel {
  email: string;
  password: string;
}

export class ListModel {
  name: string;
  startedDateFrom: string;
  startedDateTo: string;
}

export class CreatedModel {
  name: string;
  email: string;
  groupId: number;
  startedDate: Date;
  positionId: number;
  password: string;
  createdDate: Date;
  updatedDate: Date;
}

export class UpdatedModel {
  name: string;
  email: string;
  groupId: number;
  startedDate: Date;
  positionId: number;
  password: string;
  createdDate: Date;
  updatedDate: Date;
}
