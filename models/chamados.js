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
            atendimento: DataTypes.STRING,        
        },{
            sequelize
        })
    }

    static associate(models){
        this.belongsTo(models.Usuario, { foreignKey: 'user_id', as: 'user' });
        this.belongsTo(models.Equipamentos, { foreignKey: 'eqp_id', as: 'equipamentos' });
        this.hasMany(models.Saidas, { foreignKey: 'item_id', as: 'saidas' });
        this.hasMany(models.Observacoes, {foreignKey: 'chamado_id', as: 'obs'})
    }
}

module.exports = Chamados;