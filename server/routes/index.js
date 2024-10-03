import express from 'express';
const Router = express.Router();
import companyRoutes from './api/company.js';
import customerRoutes from './api/customer.js';

Router.use('/company', companyRoutes);
Router.use('/customer', customerRoutes);

Router.get('/', (req, res) => {
    res.send('API is working');
});

export default Router;