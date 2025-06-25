const Painter = require('../models/Painter')

module.exports = {
    getMain: async (req, res) => {
        let data = await Painter.find()
        res.render('registration.ejs', { isAuthenticated: req.isAuthenticated(), info: data, lastPainter: null})
    },
    addEntry: async (req, res) => {
        try {
            await Painter.create({fullName: req.body.name, numOfModels: Number(req.body.numOfModels), competition: req.body.competition, prizes: {}, judged: req.body.judged})
            console.log('Entry added')
            let data = await Painter.find()
            const painter = await Painter.findOne({fullName: req.body.name, numOfModels: req.body.numOfModels, competition: req.body.competition})
            console.log("Painter ID:", painter.id)
            res.render('registration.ejs', { isAuthenticated: req.isAuthenticated(), info: data, lastPainter: {name: painter.fullName, id: painter.id}})
        } 
        catch(error) {
            console.log(error)
            res.render('errormes.ejs', {error: error})
        }
    },
}  