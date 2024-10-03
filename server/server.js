import express from 'express';
import bodyParser from 'body-parser';
import { sequelize } from './models/index.js';
import Router from './routes/index.js';

const app = express();
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/', Router);

const PORT = process.env.PORT || 3000;

// Sync database
sequelize.sync().then(() => {
    console.log('Database sync');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});