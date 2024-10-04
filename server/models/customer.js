export default (sequelize, DataTypes) => {
    const Customer = sequelize.define(
        'customers',
        {
            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                primaryKey: true,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            first_name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            last_name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            phone: {
                type: DataTypes.STRING(20),
                allowNull: true,
                validate: {
                    is: /^\+?[0-9\- ]+$/,
                },
            },
            orders_count: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            state: {
                type: DataTypes.ENUM('enabled', 'disabled'),
                allowNull: false,
                defaultValue: 'enabled',
            },
            total_spent: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                defaultValue: 0.0,
            },
            last_order_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
            },
            note: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            verified_email: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            tax_exempt: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            tags: {
                type: DataTypes.STRING(10),
                allowNull: true,
            },
            currency: {
                type: DataTypes.CHAR(3),
                allowNull: false,
                defaultValue: 'CAD',
            },
            accepts_marketing: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            marketing_opt_in_level: {
                type: DataTypes.TEXT,
                allowNull: false,
                defaultValue: 'single_opt_in',
            },
            admin_graphql_api_id: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            default_address_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
                references: {
                    model: 'addresses',
                    key: 'id',
                },
            },
            company_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
                references: {
                    model: 'companies',
                    key: 'id',
                },
            },
        },
        {
            tableName: 'customers',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            underscored: true,
        }
        );
        Customer.associate = (models) => {
            Customer.belongsTo(models.Company, {
                foreignKey: 'company_id',
                as: 'companies',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            });
            Customer.hasMany(models.Address, {
                foreignKey: 'customer_id',
                as: 'addresses',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        };
        return Customer;
};
