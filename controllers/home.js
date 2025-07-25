const Painter = require('../models/Painter')
const User = require('../models/User')

module.exports = {
    getIndex: (req, res) => {
        res.render('index.ejs', { isAuthenticated: req.isAuthenticated() })
    }, 
    getHelp: (req, res) => {
        res.render('help.ejs', { isAuthenticated: req.isAuthenticated() })
    },
    getStats: async (req, res) => {
        try {
            let data = await Painter.find().lean()
            res.render('stats.ejs', {isAuthenticated: req.isAuthenticated(), info: data})
        }
        catch (err) {
            res.render('errormes.ejs', {error: "Error in getStats(): " + err, isAuthenticated: req.isAuthenticated() })
        }
    },
    getNum: async (req, res) => {
        try {
            let num = await Painter.countDocuments() 
            res.send(String(num + 1))
        } 
        catch(err) { 
            res.render('errormes.ejs', {error: "Error in getNum(): " + err, isAuthenticated: req.isAuthenticated()})
        } 
    },
    getEntry: async (req, res) => {
        try {
            let result = await Painter.findOne({id: Number(req.params.id)}).lean()
            res.json(result)
        }
        catch (err) {
            res.render('errormes.ejs', {error: "Error in getEntry(): " + err, isAuthenticated: req.isAuthenticated()})
        }
    },
    checkPrize: async (req, res) => {
        try {
            let prize = req.params.prize
            let all = await Painter.find().lean()
            let match = all.filter(e => e["prizes"][prize])
            if (match) {
                res.json(match)
            }          
        }
        catch (err) {
            res.render('errormes.ejs', {error: "Error in checkPrize(): " + err, isAuthenticated: req.isAuthenticated()})
        }
    },
    getFilters: (req, res) => {
        try {
            res.render('filters.ejs', {isAuthenticated: req.isAuthenticated(), prize: null})
        } 
        catch (err) {
            res.render('errormes.ejs', {error: "Error in getFilters(): " + err, isAuthenticated: req.isAuthenticated()})
        }
    }, 
    filterPrize: async (req, res) => {
        try {
            let prize = req.params.prize
            console.log(prize)
            let data = await Painter.find().lean()
            if (prize == "Special") {
                data = data.filter(entry => entry.prizes.corrr || entry.prizes.sponsors.length || entry.prizes.peoplesChoice || entry.prizes.standardBestOfShow || entry.prizes.mastersBestOfShow )
            } 
            else {
                const categories = {Juniors: 1, FigStandard: 2, FigMasters: 3, VroomStandard: 4, VroomMasters: 5}
                const num = categories[prize]
                data = data.filter(entry => (entry.competition == num) && ((entry.prizes.medal) || entry.prizes.junBestOfShow))
            }
            res.render('filters.ejs', {isAuthenticated: req.isAuthenticated(), prize: prize, info: data})
        }
        catch (err) {
            res.render('errormes.ejs', {error: "Error in filterPrize(): " + err, isAuthenticated: req.isAuthenticated()})
        } 
    },     
}  