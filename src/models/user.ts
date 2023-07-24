import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from 'sequelize';
import sequelize from '../core/connection';

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  id: number | undefined

  email: string;

  password: string;

  name: string;

  groupId: number;

  startedDate: Date;

  positionId: number;

  createdDate: Date;

  updatedDate: Date;

  deletedDate: Date | null | undefined;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    groupId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'group_id',
    },
    startedDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'started_date',
    },
    positionId: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field: 'position_id',
    },
    createdDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'created_date',
    },
    updatedDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'updated_date',
    },
    deletedDate: {
      type: DataTypes.DATEONLY,
      field: 'deleted_date',
    },
  },
  {
    sequelize,
    tableName: 'user',
    timestamps: false,
  },
);