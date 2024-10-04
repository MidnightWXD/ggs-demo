import { Company, Customer } from '../models/index.js';

const companyController = {
    getAll: async (req, res) => {
        try {
            const companies = await Company.findAll({
                include: [{ model: Customer, as: 'customers' }],
            });
            res.json(companies);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    create: async (req, res) => {
        try {
            const company = await Company.create(req.body);
            res.status(201).json(company);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getById: async (req, res) => {
        try {
            const company = await Company.findByPk(req.params.id, {
                include: [{ model: Customer, as: 'customers' }],
            });
            if (company) {
                res.json(company);
            } else {
                res.status(404).json({ error: 'Company not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const [updated] = await Company.update(req.body, {
                where: { id: req.params.id },
            });
            if (updated) {
                const updatedCompany = await Company.findByPk(req.params.id);
                res.json(updatedCompany);
            } else {
                res.status(404).json({ error: 'Company not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const deleted = await Company.destroy({
                where: { id: req.params.id },
            });
            if (deleted) {
                res.json({ message: 'Company deleted' });
            } else {
                res.status(404).json({ error: 'Company not found' });
            }
        } catch (error) {
            es.status(500).json({ error: error.message });
        }
    },
};

export default companyController;
