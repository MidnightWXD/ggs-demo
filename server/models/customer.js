export default (sequelize, DataTypes) => {
    const Customer = sequelize.define('Customer', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        contactInfo: DataTypes.STRING,
        shopifyCustomerId: DataTypes.STRING,
    });
    Customer.associate = (models) => {
        Customer.belongsTo(models.Company, { foreignKey: 'companyId', as: 'company' });
    };
    return Customer;
};
