import { Model, Sequelize, DataTypes } from 'sequelize';
import { ClientAttributes } from '../attributes';

class Client extends Model implements ClientAttributes {
  public id!: number;
  public name!: string;
  public key!: string;

  static initModel(sequelize: Sequelize): void {
    Client.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
        },
        key: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        underscored: false,
        tableName: 'Clients',
        timestamps: false,
      }
    );
  }
}

export default Client;
