import express from 'express';
const Router = express.Router();
import companyController from '../../controllers/companyController.js';

Router.get('/', companyController.getAll);
Router.post('/', companyController.create);
Router.get('/:id', companyController.getById);
Router.put('/:id', companyController.update);
Router.delete('/:id', companyController.delete);

export default Router;