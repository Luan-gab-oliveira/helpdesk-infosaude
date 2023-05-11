const { Model, DataTypes } = require('sequelize');

class MateriaisUtilizados extends Model{
    static init(sequelize){
        super.init({        
            quantidade: DataTypes.INTEGER,        
        },{
            sequelize
        })
    }

    static associate(models){
        this.belongsTo(models.Chamados, { foreignKey: 'chamado_id', as: 'chamado' });
        this.belongsTo(models.Estoque, { foreignKey: 'estoque_id', as: 'estoque' });
    }
}

module.exports = MateriaisUtilizados;