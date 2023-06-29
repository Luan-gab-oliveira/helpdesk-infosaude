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
            // classificacao: DataTypes.STRING,        
        },{
            sequelize
        })
    }

    static associate(models){
        this.belongsTo(models.Usuario, { foreignKey: 'user_id', as: 'user' });
        this.hasMany(models.Saidas, { foreignKey: 'item_id', as: 'saidas' });
        this.hasMany(models.Observacoes, {foreignKey: 'chamado_id', as: 'observacoes'})
    }
}

module.exports = Chamados;