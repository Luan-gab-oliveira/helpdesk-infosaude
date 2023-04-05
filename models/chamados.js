const { Model, DataTypes } = require('sequelize');

class Chamados extends Model{
    static init(sequelize){
        super.init({
            nome: DataTypes.STRING,
            local: DataTypes.STRING,
            telefone: DataTypes.STRING,
            ocorrencia: DataTypes.STRING,        
            descricao: DataTypes.STRING,        
            status: DataTypes.STRING,        
        },{
            sequelize
        })
    }

    static associate(models){
        this.belongsTo(models.Usuario, { foreignKey: 'user_id', as: 'user' });
    }
}

module.exports = Chamados;