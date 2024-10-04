export default (sequelize, DataTypes) => {
    const Address = sequelize.define(
        'addresses',
        {
            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
            },
            customer_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
                references: {
                    model: 'customers',
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
            first_name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            last_name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            company: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            address1: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            address2: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            city: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            province: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            country: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            zip: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            phone: {
                type: DataTypes.STRING(20),
                allowNull: true,
                validate: {
                    is: /^\+?[0-9\- ]+$/,
                },
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            province_code: {
                type: DataTypes.STRING(10),
                allowNull: true,
            },
            country_code: {
                type: DataTypes.CHAR(2),
                allowNull: false,
            },
            country_name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            is_default: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
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
            tableName: 'addresses',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            underscored: true,
        }
    );
    Address.associate = (models) => {
        Address.belongsTo(models.Customer, {
            foreignKey: 'default_address_id',
            as: 'customers',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
        Address.belongsTo(models.Company, {
            foreignKey: 'default_address_id',
            as: 'companies',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
    };
    return Address;
}