import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from 'sequelize';
import sequelize from '../core/connection';

export class Group extends Model<
  InferAttributes<Group>,
  InferCreationAttributes<Group>
> {
  declare id: number;

  declare name: string;

  declare note: string | null;

  declare groupLeaderId: string;

  declare groupFloorNumber: number;

  declare createdDate: Date;

  declare updatedDate: Date;

  declare deletedDate: Date | null;
}

Group.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    note: {
      type: DataTypes.TEXT,
    },
    groupLeaderId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'group_leader_id',
    },
    groupFloorNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'group_floor_number',
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
    tableName: 'group',
    timestamps: false,
  },
);
