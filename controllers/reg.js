const Painter = require('../models/Painter')

module.exports = {
    getMain: async (req, res) => {
        let data = await Painter.find()
        res.render('registration.ejs', { isAuthenticated: req.isAuthenticated(), info: data})
    },
    addEntry: async (req, res) => {
        console.log(req.body)
        try {
            await Painter.findOneAndUpdate({id: Number(req.body.entryId)},{
                fullName: req.body.name,
                numOfModels: Number(req.body.numOfModels),
                competition: req.body.competition,
                judged: req.body.judged     
                })
            console.log('Entry Added')
            res.redirect('/registration')
        } 
        catch(error) {
            console.log(error)
            res.render(errormes.ejs, {error: error})
        }
    },
    postEntry: async (req, res) => {
        try {
            let num = await Painter.countDocuments()
            console.log("Num: ", num)
            let lastEntry = await Painter.findOne({id: num})
            console.log(lastEntry)
            if (lastEntry && !lastEntry.fullName) {
                id = lastEntry.id
                console.log("Empty entry detected!")
                res.send(String(id))
                return
            }
            id = num + 1
            console.log("Id: ", id)
            await Painter.create({id: id, fullName: "", numOfModels: 0, competition: 0, prizes: {}})
            console.log('Entry added')
            res.send(String(id))
        }
        catch (err) {
            console.log(err) 
            res.render(errormes.ejs, {error: error})
        }
    }
}