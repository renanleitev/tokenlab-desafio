import Event from './Event';
import Invitation from './Invitation';
import User from './User';

// Associações de eventos
Event.hasMany(Invitation, { foreignKey: 'eventId', as: 'invitations' });
Event.belongsTo(User, { foreignKey: 'userId' });

// Associações de convites
Invitation.belongsTo(Event, { foreignKey: 'eventId', as: 'event' });
Invitation.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export { Event, Invitation };
