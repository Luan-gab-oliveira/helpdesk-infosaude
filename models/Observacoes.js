const { Model, DataTypes } = require('sequelize');

class Observacoes extends Model{
    static init(sequelize){
        super.init({
            obs: DataTypes.STRING,     
            user: DataTypes.STRING,     
        },{
            sequelize
        })
    }

    static associate(models){
        this.belongsTo(models.Chamados, { foreignKey: 'chamado_id', as: 'chamado' });
    }
}


module.exports = Observacoes;