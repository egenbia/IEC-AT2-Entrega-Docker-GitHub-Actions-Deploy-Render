import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { testConnection, sequelize } from './config/database';
import { FunkoPop } from './models/FunkoPop';
import funkopopRoutes from './routes/funkopop.routes';
import swaggerDocument from "./docs/swagger.json";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Health check (usado pelo Render)
app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Funko Pop API v2 - deploy via GitHub Actions',
    uptime: process.uptime(),
  });
});

// Documentação Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas
app.use('/', funkopopRoutes);

const init = async (): Promise<void> => {
  await testConnection();
  await sequelize.sync({ alter: true });
  console.log('📦 Tabelas sincronizadas com o banco de dados.');

  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
  });
};

init();