const Painter = require('../models/Painter')

module.exports = {
    getMain: async (req, res) => {
        let data = await Painter.find()
        res.render('registration.ejs', { isAuthenticated: req.isAuthenticated(), info: data})
    },
    addEntry: async (req, res) => {
        try {
            await Painter.create({fullName: req.body.name, numOfModels: Number(req.body.numOfModels), competition: req.body.competition, prizes: {}, judged: req.body.judged})
            console.log('Entry added')
            const painter = await Painter.findOne({fullName: req.body.name, numOfModels: req.body.numOfModels, competition: req.body.competition})
            res.redirect('/registration')
        } 
        catch(error) {
            console.log(error)
            res.render('errormes.ejs', {error: error})
        }
    },
}