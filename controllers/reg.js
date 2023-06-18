const Painter = require('../models/Painter')

module.exports = {
    getMain: async (req, res) => {
        let data = await Painter.find()
        res.render('registration.ejs', { isAuthenticated: req.isAuthenticated(), info: data})
    },
    addEntry: async (req, res) => {
        console.log(req.body)
        try {
            await Painter.findOneAndUpdate({id: Number(request.body.entryId)},{
                fullName: request.body.name,
                numOfModels: Number(request.body.numOfModels),
                inCompetition: request.body.inComp == "yesInComp",
                junior: request.body.junior == "yesJunior",
                judged: request.body.inComp == "yesInComp" ? request.body.judged == "yesJudged" : "N/A"     
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
            let lastEntry = await Painter.find({id: num})
            if (!lastEntry.fullName) {
                id = lastEntry.id
                console.log("Empty entry detected!")
                res.send(String(id))
                return
            }
            id = num + 1
            await Painter.create({id: id, fullName: "", numOfModels: 0, inCompetition: false, prizes: {}})
            console.log('Entry added')
            res.send(String(id))
        }
        catch (err) {
            console.log(err)
        }
    }
}