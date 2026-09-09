import { Sequelize , DataTypes } from "sequelize";
import sequelize from "../connectionDB.js";

const user=sequelize.define('user',{
    id:{ 
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
     name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
email: {
        type: DataTypes.STRING(255),
        validate: {
            isEmail: true,
        },
        unique: true,
        allowNull: false
    },
password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            checkPasswordLength(value) {
                if (value.length <= 6) {
                    throw new Error("Password must be at least 7 characters long");
                }
            }
        },
    },
    role: {
        type: DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user',
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    hooks: {
        beforeCreate: (userInstance, options) => {
            if (userInstance.name.length <= 2) {
                throw new Error("Name must be greater than 2 characters long");
            }
        }
    }
});

export default user;