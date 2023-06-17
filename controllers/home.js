const Painter = require('../models/Painter')

module.exports = {
    getIndex: (req, res) => {
        res.render('index.ejs')
    },
    getHelp: (req, res) => {
        res.render('help.ejs')
    },
    getStats: (req, res) => {
        res.render('stats.ejs')
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
            let result = await Painter.find({id: Number(req.params.id)}).lean()
            res.json(result)
        }
        catch (err) {
            console.log(err)
        }
    },
    checkPrize: async (req, res) => {
        try {
            let prize = req.params.prize
            let match = await Painter.find({prizes: {prize: true}}).lean()
            console.log(match)
            response.json(match)            
        }
        catch (err) {
            console.log(err)
        }
    },
    getFilters: async (req, res) => {
        try {
            let data = await Painter.find()
            res.render('filters.ejs', {info: data})
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
                if (prize == "sponsors") {
                    return e.prizes[prize] ? e.prizes[prize].join('') !== "" : false
                } else {
                return Object.values(e.prizes).includes(prize) || e.prizes[prize]
            }
        })
            console.log(data)
            response.render('filters.ejs', { info: data })
        }
        catch (err) {
            console.log(err)
        }
    }
}