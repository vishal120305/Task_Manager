import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { createTask, getTaskById, getTasks,updateTaskById,deleteTask} from '../controller/taskController.js';
const taskRouter = express.Router();

taskRouter.route('/gp').get(authMiddleware, getTasks).post(authMiddleware, createTask);
taskRouter.route('/:id/gp').get(authMiddleware, getTaskById).put(authMiddleware, updateTaskById).delete(authMiddleware, deleteTask);


export default taskRouter;