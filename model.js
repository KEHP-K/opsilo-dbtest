const path=require('path');
require('dotenv').config({ path: path.join(__dirname, './.env') });
const Sequelize = require('sequelize');

const sequelize=new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWD,{
    host:process.env.DB_HOST,
    dialect: 'mariadb',
    dialectOptions: {connectTimeout: 1000}
})

const User = sequelize.define('user',{
    username:{
        type:Sequelize.STRING,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    }
}, 
{
    timestamps:false,
    freezeTableName:true
});

module.exports={
    sequelize:sequelize,
    User:User
}
