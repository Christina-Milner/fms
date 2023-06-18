const Painter = require('../models/Painter')

module.exports = {
    getMain: async (req, res) => {
        let data = await Painter.find()
        res.render('judging.ejs', { isAuthenticated: req.isAuthenticated(), info: data})
    },
    addEntry: async (req, res) => {
        try {
            await Painter.findOneAndUpdate({id: Number(req.body.entryId)}, {
                judged: request.body.judged == "notForJudging" ? "N/A" : request.body.judged == "yesJudged",
                prizes: {
                    medal: request.body.medals,
                    bestOfShow: request.body.bestOfShow == "on",
                    junBestOfShow: request.body.junBestOfShow == "on",
                    corrr: request.body.corrr == "on",
                    peoplesChoice: request.body.peoplesChoice == "on",
                    sponsors: request.body.sponsors.split(',')
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