export default (sequelize, DataTypes) => {
    const Company = sequelize.define(
        'companies',
        {
            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true,
            },
            address_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
                references: {
                    model: 'addresses',
                    key: 'id',
                },
            },
            default_address_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
                references: {
                    model: 'addresses',
                    key: 'id',
                },
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
            },
        },
        {
            tableName: 'companies',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            underscored: true,
        }
    );
    Company.associate = (models) => {
        Company.hasMany(models.Customer, {
            foreignKey: 'company_id',
            as: 'customers',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        });
        Company.hasMany(models.Address, {
            foreignKey: 'company_id',
            as: 'addresses',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
    };
    return Company;
};