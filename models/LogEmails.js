const { Model, DataTypes } = require('sequelize');

class LogEmails extends Model{
    static init(sequelize){
        super.init({
            from: DataTypes.STRING,
            to: DataTypes.STRING,
            subject: DataTypes.STRING,
            text: DataTypes.STRING,           
        },{
            sequelize
        })
    }

    static associate(models){
        this.belongsTo(models.Chamados, { foreignKey: 'chamado_id', as: 'chamado' });
    }
}


module.exports = LogEmails;