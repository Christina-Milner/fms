const Painter = require('../models/Painter')
const User = require('../models/User')

module.exports = {
    errorMes: (req, res) => {
        res.render('error.ejs')
    },
    getIndex: (req, res) => {
        res.render('index.ejs', { isAuthenticated: req.isAuthenticated() })
    },
    getHelp: (req, res) => {
        res.render('help.ejs', { isAuthenticated: req.isAuthenticated() })
    },
    getStats: async (req, res) => {
        try {
            let data = await Painter.find()
            res.render('stats.ejs', {isAuthenticated: req.isAuthenticated(), info: data})
        }
        catch (err) {
            console.log(err)
        }
    },
    getNum: async (req, res) => {
        try {
            let num = await Painter.countDocuments()
            res.send(String(num + 1))
        }
        catch(err) {
            console.log(err)
        }
    },
    getEntry: async (req, res) => {
        try {
            let result = await Painter.findOne({id: Number(req.params.id)}).lean()
            res.json(result)
        }
        catch (err) {
            console.log(err)
        }
    },
    checkPrize: async (req, res) => {
        try {
            let prize = req.params.prize
            let all = await Painter.find()
            let match = all.filter(e => e["prizes"][prize])
            if (match) {
                res.json(match)
            }          
        }
        catch (err) {
            console.log(err)
        }
    },
    getFilters: async (req, res) => {
        try {
            let data = await Painter.find()
            res.render('filters.ejs', {isAuthenticated: req.isAuthenticated(), info: data})
        }
        catch (err) {
            console.log(err)
        }
    },
    filterPrize: async (req, res) => {
        try {
            let prize = req.params.prize
            let data = await Painter.find()
            data = data.filter(e => {
                if (prize == "none") {
                    return Object.values(e.prizes).every(prize => typeof(prize) === "object" ? !prize.length : !prize)
                }
                if (prize == "sponsors") {
                    return Boolean(e.prizes[prize].length)
                } else {
                return Object.values(e.prizes).includes(prize) || e.prizes[prize]
                }
            })
            if (prize === "none") {
                res.render('filtersnone.ejs', {isAuthenticated: req.isAuthenticated(), info: data })
                return
            }
            if (prize === "sponsors") {
                let sponsorPrizes = {}
                let sponsors = data.reduce((acc, cur) => acc.concat(cur["prizes"]["sponsors"]), []).sort((a, b) => a.localeCompare(b))
                sponsors.forEach(el => sponsorPrizes[el] = true)
                for (let sponsor in sponsorPrizes) {
                    sponsorPrizes[sponsor] = data.filter(el => el["prizes"]["sponsors"].includes(sponsor))
                }
                res.render('filterssponsors.ejs', {isAuthenticated: req.isAuthenticated(), info: sponsorPrizes })
            } else {
                res.render('filters.ejs', {isAuthenticated: req.isAuthenticated(), info: data })
            }
        }
        catch (err) {
            console.log(err)
        }
    }
}