const Painter = require('../models/Painter')

module.exports = {
    getMain: async (req, res) => {
        let data = await Painter.find()
        res.render('judging.ejs', { isAuthenticated: req.isAuthenticated(), info: data})
    },
    addEntry: async (req, res) => {
        try {
            await Painter.findOneAndUpdate({id: Number(req.body.entryId)}, {
                judged: req.body.judged == "notForJudging" ? "N/A" : req.body.judged == "yesJudged",
                prizes: {
                    medal: req.body.medals,
                    bestOfShow: req.body.bestOfShow == "on",
                    junBestOfShow: req.body.junBestOfShow == "on",
                    corrr: req.body.corrr == "on",
                    peoplesChoice: req.body.peoplesChoice == "on",
                    sponsors: req.body.sponsors.split(',')
                }
            })
            console.log('Entry updated with judging')
            res.redirect('/judging')
        }
        catch (err) {
            console.log(err)
        }
    }

}