const { Model, DataTypes } = require('sequelize');

class Estoque extends Model{
    static init(sequelize){
        super.init({
            material: DataTypes.STRING,     
        },{
            sequelize
        })
    }
}


module.exports = Estoque;