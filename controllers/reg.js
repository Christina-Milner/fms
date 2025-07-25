const Painter = require('../models/Painter')
const Counter = require('../models/Counter')

module.exports = {
    getMain: async (req, res) => {
        let data = await Painter.find()
        res.render('registration.ejs', { isAuthenticated: req.isAuthenticated(), info: data, lastPainter: null})
    },
    addEntry: async (req, res) => {
        const getNextPainterId = async () => {
            const result = await Counter.findOneAndUpdate(
                { name: "painterId" },
                { $inc: { current: 1 } },
                { upsert: true, new: true }
            )
            return result.current
        }  

        const existingId = req.body.entryId
        // This is where the POST/PUT split now happens
        console.log(existingId)
        if (existingId) {
                try {
                    const painter = await Painter.findOneAndUpdate({id: existingId}, {fullName: req.body.name, numOfModels: Number(req.body.numOfModels), competition: req.body.competition, judged: req.body.judged})
                    //console.log('Entry edited')
                    const data = await Painter.find()
                    res.render('registration.ejs', { isAuthenticated: req.isAuthenticated(), lastPainter: false, info: data})
                }
                catch(error) {
                //console.log(error)
                res.render('errormes.ejs', {error: "Error on editing entry" + error, isAuthenticated: req.isAuthenticated()})
            }
        } else {
            try {
                let nextId = await getNextPainterId()
                const painter = await Painter.create({id: nextId, fullName: req.body.name, numOfModels: Number(req.body.numOfModels), competition: req.body.competition, prizes: {}, judged: req.body.judged})
                //console.log('Entry added')
                const data = await Painter.find()
                res.render('registration.ejs', { isAuthenticated: req.isAuthenticated(), info: data, lastPainter: {name: painter.fullName, id: painter.id}})
            } 
            catch(error) {
                //console.log(error)
                res.render('errormes.ejs', {error: "Error on creating entry" + error, isAuthenticated: req.isAuthenticated()})
            }
        }
    }, 
}   

// FIX UGLY LAYOUT CAUSED BY LONG CATEGORY NAMES