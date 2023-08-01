const { Model, DataTypes } = require('sequelize');

class Contatos extends Model{
    static init(sequelize){
        super.init({
            email: DataTypes.STRING      
        },{
            sequelize
        })
    }
}


module.exports = Contatos;