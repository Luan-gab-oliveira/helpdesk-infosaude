const { Model, DataTypes } = require('sequelize');

class Assinaturas extends Model{
    static init(sequelize){
        super.init({
            nome: DataTypes.STRING,      
            assinatura: DataTypes.STRING,      
        },{
            sequelize
        })
    }
}


module.exports = Assinaturas;