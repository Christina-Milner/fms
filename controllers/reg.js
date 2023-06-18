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
                inCompetition: req.body.inComp == "yesInComp",
                junior: req.body.junior == "yesJunior",
                judged: req.body.inComp == "yesInComp" ? req.body.judged == "yesJudged" : "N/A"     
                })
            console.log('Entry Added')
            res.redirect('/registration')
        } 
        catch(error) {
            console.log(error)
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
            await Painter.create({id: id, fullName: "", numOfModels: 0, inCompetition: false, prizes: {}})
            console.log('Entry added')
            res.send(String(id))
        }
        catch (err) {
            console.log(err)
        }
    }
}