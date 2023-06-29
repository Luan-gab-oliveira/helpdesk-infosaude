const { Model, DataTypes } = require('sequelize');

class Config extends Model{
    static init(sequelize){
        super.init({
            config: DataTypes.STRING,          
        },{
            sequelize
        })
    }

}

module.exports = Config;