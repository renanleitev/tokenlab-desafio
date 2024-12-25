import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { User } from './User';
import Event from './Event';

export class Invitation extends Model {
  public id!: number; // ID do convite
  public eventId!: number; // ID do evento ao qual o usuário foi convidado
  public userId!: number; // ID do usuário convidado
  public status!: string; // Status do convite: 'pending', 'accepted', 'rejected'
}

Invitation.init(
  {
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Event,
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending', // O status padrão é 'pending'
      validate: {
        isIn: [['pending', 'accepted', 'rejected']], // Status válidos
      },
    },
  },
  {
    sequelize,
    modelName: 'Invitation',
    timestamps: true, // Garante que 'createdAt' e 'updatedAt' sejam gerados automaticamente
  },
);

export default Invitation;
