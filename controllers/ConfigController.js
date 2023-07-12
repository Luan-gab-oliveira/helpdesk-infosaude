const config = require('../config/settings.json')

module.exports = {
    async loadConfig(req,res){
        
        const transfer = config.nodemailer.send
        res.render('admin/config', {transfer: transfer})
    },
}