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
    getId: async (req, res) => {
        try {
            let result = await Painter.findOne({fullName: req.params.name, numOfModels: req.params.num}).lean()
            res.json(result)
        }
        catch (err) {
            res.render('errormes.ejs', {error: "Error in getId(): " + err, isAuthenticated: req.isAuthenticated()})
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
            let data = await Painter.find().lean()
            if (prize === "standard") {
                data = data.filter(entry => { 
                    return entry.competition < 3 && (entry.prizes.medal || entry.prizes.standardBestOfShow || entry.prizes.corrr || entry.prizes.junBestOfShow) // Junior or standard and has won a prize
                            || entry.prizes.sponsors.length // All sponsors go here
                
                })
            }
            else if (prize === "masters") {
                data = data.filter(entry => { 
                    return entry.competition === 3 && (entry.prizes.medal || entry.prizes.mastersBestOfShow || entry.prizes.corrr) // Masters and has won a prize other than sponsors                
                })
            }
            else { 
                res.render('errormes.ejs', {error: "You managed to trigger an else that shouldn't be a thing.", isAuthenticated: req.isAuthenticated()})
            }
            res.render('filters.ejs', {isAuthenticated: req.isAuthenticated(), prize: prize, info: data})
        }
        catch (err) {
            res.render('errormes.ejs', {error: "Error in filterPrize(): " + err, isAuthenticated: req.isAuthenticated()})
        } 
    },    
}