import express, { Request } from 'express';
import 'dotenv/config';
import cors from 'cors';
import sequelize from './config/database';
import authRoutes from './routes/auth';
import eventRoutes from './routes/events';
import invitationRoutes from './routes/invitations';

const app = express();

const PORT = process.env.SERVER_PORT || 3000;


app.use(express.json());
app.use(cors<Request>());

// Rotas da API
app.use('/auth', authRoutes);
app.use('/events', eventRoutes);
app.use('/invitations', invitationRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
});
