const { Model, DataTypes } = require('sequelize');

class Saidas extends Model{
    static init(sequelize){
        super.init({
            quantidade: DataTypes.INTEGER,          
        },{
            sequelize
        })
    }

    static associate(models){
        this.belongsTo(models.Chamados, { foreignKey: 'chamado_id', as: 'chamado' });
        this.belongsTo(models.Materiais, { foreignKey: 'item_id', as: 'item' });
    }
}

module.exports = Saidas;