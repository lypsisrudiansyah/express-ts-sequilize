import express from 'express';
import taskRoutes from './routers/taskRouter';
import sequelize from './database/database_config'; // Adjust path if needed

const app = express();

app.use(express.json());
app.use('/api', taskRoutes);

(async () => {
  try {
    await sequelize.sync();
    console.log('Database connected successfully!');
    app.listen(3001, () => {
      console.log('Server listening on port 3001');
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
})();