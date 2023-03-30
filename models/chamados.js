const { Model, DataTypes } = require('sequelize');

class Usuario extends Model{
    static init(sequelize){
        super.init({
            nome: DataTypes.STRING,
            local: DataTypes.STRING,
            telefone: DataTypes.STRING,
            ocorrencia: DataTypes.STRING,        
            descriacao: DataTypes.STRING,        
            status: DataTypes.INTEGER,        
        },{
            sequelize
        })
    }
}

module.exports = Usuario;