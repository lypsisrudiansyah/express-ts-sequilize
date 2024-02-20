import express from 'express';
import taskRoutes from './routers/taskRouter';
import sequelize from './database/database_config'; // Adjust path if needed
import { TaskModel } from './models/taskModel';

const app = express();

app.use(express.json());
app.use('/api', taskRoutes);
// sequelize.define("TaskModel", TaskModel);
// sequelize.sync({force: true}).then(() => {
//   console.log('Database & tables created!');
// });
TaskModel.sync({force: true}).then(() => {
  console.log('Database & tables created!');
});


(async () => {
  try {
    console.log('Database connected successfully!');
    app.listen(3001, () => {
      console.log('Server listening on port 3001');
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
})();