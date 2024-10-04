import axios from 'axios';
import { Customer, Company } from '../models/index.js';
//get the environment variables
import 'dotenv/config';
const { SHOPIFY_STORE_DOMAIN, SHOPIFY_API_VERSION, SHOPIFY_ACCESS_TOKEN } = process.env;

const shopifyAxios = axios.create({
    baseURL: `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}`,
    headers: {
        'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
        'Content-Type': 'application/json',
    },
});

const customerController = {
    getAll: async (req, res) => {
        try {
            // fetch all customers from Shopify
            const shopifyResponse = await shopifyAxios.get('/customers.json');
            const shopifyCustomers = shopifyResponse.data.customers;
            res.status(200).json(shopifyCustomers);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    create: async (req, res) => {
        try {
            const { name, email, contactInfo, companyId } = req.body;
            const shopifyResponse = await shopifyAxios.post('/customers.json', {
            customer: {
                first_name: name,
                email: email,
            },
            });
            const shopifyCustomerId = shopifyResponse.data.customer.id;
            const customer = await Customer.create({
                name,
                email,
                contactInfo,
                companyId,
                shopifyCustomerId,
            });
            res.status(201).json(customer);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getById: async (req, res) => {
        try {
            const customer = await Customer.findByPk(req.params.id, {
                include: [{ model: Company, as: 'company' }],
            });
            if (customer) {
                const shopifyResponse = await shopifyAxios.get(
                    `/customers/${customer.shopifyCustomerId}.json`
                );
                res.json({
                    ...customer.toJSON(),
                    shopifyData: shopifyResponse.data.customer,
                });
            } else {
                res.status(404).json({ error: 'Customer not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { name, email, contactInfo, companyId } = req.body;
            const customer = await Customer.findByPk(req.params.id);
            if (customer) {
            await shopifyAxios.put(`/customers/${customer.shopifyCustomerId}.json`, {
                customer: {
                    id: customer.shopifyCustomerId,
                    first_name: name,
                    email: email,
                },
            });
            await customer.update({ name, email, contactInfo, companyId });
                res.json(customer);
            } else {
                res.status(404).json({ error: 'Customer not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const customer = await Customer.findByPk(req.params.id);
            if (customer) {
                await shopifyAxios.delete(`/customers/${customer.shopifyCustomerId}.json`);
                await customer.destroy();
                res.json({ message: 'Customer deleted' });
            } else {
                res.status(404).json({ error: 'Customer not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

export default customerController;