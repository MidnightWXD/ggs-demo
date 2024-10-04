import express from 'express';
const Router = express.Router();
import customerController from '../../controllers/customerController.js';

Router.get('/', customerController.getAll);
Router.post('/', customerController.create);
Router.get('/:id', customerController.getById);
Router.put('/:id', customerController.update);
Router.delete('/:id', customerController.delete);

export default Router;
