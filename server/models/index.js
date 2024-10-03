import 'dotenv/config';
import { Sequelize, DataTypes } from 'sequelize';
import CustomerModel from './customer.js';
import CompanyModel from './company.js'; // Assuming you have a company.js file for the Company model

// Initialize Sequelize with your database configuration
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql', // or 'postgres', 'sqlite', 'mariadb', 'mssql'
});

// Import models
const Customer = CustomerModel(sequelize, DataTypes);
const Company = CompanyModel(sequelize, DataTypes);

// Set up associations
Object.keys(sequelize.models).forEach(modelName => {
    if (sequelize.models[modelName].associate) {
        sequelize.models[modelName].associate(sequelize.models);
    }
});

// Export the initialized Sequelize instance and models
export { sequelize, Customer, Company };