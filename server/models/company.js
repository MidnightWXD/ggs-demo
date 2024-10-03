export default (sequelize, DataTypes) => {
    const Company = sequelize.define('Company', {
        name: DataTypes.STRING,
        address: DataTypes.STRING,
    });

    Company.associate = (models) => {
        Company.hasMany(models.Customer, { foreignKey: 'companyId', as: 'customers' });
    };

    return Company;
};