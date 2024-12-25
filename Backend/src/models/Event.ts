import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { User } from './User';
import Invitation from './Invitation';

export class Event extends Model {
  public id!: number;
  public descricao!: string;
  public horaInicio!: Date;
  public horaFim!: Date;
  public userId!: number; // Relação com o usuário (que criou o evento)
}

Event.init(
  {
    descricao: { type: DataTypes.STRING, allowNull: false },
    horaInicio: { type: DataTypes.DATE, allowNull: false },
    horaFim: { type: DataTypes.DATE, allowNull: false },
  },
  { sequelize, modelName: 'Event' },
);

// Definindo a relação

export default Event;
