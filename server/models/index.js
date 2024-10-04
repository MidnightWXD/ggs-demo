import 'dotenv/config';
import { Sequelize, DataTypes } from 'sequelize';
import CustomerModel from './customer.js';
import CompanyModel from './company.js';
import AddressModel from './address.js';

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
});

const Customer = CustomerModel(sequelize, DataTypes);
const Company = CompanyModel(sequelize, DataTypes);
const Address = AddressModel(sequelize, DataTypes);

export { sequelize, Customer, Company, Address };