const { Model, DataTypes } = require('sequelize');

class Materiais extends Model{
    static init(sequelize){
        super.init({
            item: DataTypes.STRING,      
        },{
            sequelize
        })
    }

    static associate(models){
        this.hasMany(models.Saidas, { foreignKey: 'materiais_id', as: 'saidas' });
    }
}


module.exports = Materiais;