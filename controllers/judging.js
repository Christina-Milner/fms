const Painter = require('../models/Painter')

module.exports = {
    getMain: (req, res) => {
        res.render('judging.ejs', { isAuthenticated: req.isAuthenticated(), category: null})
    }, 
    getStandard: async (req, res) => {
        try {
            let data = await Painter.find().lean()
            data = data.filter(e => e.competition == 1 || e.competition == 2)
            res.render('judging.ejs', { isAuthenticated: req.isAuthenticated(), info: data, category: "Standard"})
        }
        catch(err) {
            res.render('errormes.ejs', {error: "Error in getStandard: " + err, isAuthenticated: req.isAuthenticated()})
        }
    },  
    getMasters: async (req, res) => {
        try {
            let data = await Painter.find().lean()
            data = data.filter(e => e.competition == 3)
            res.render('judging.ejs', { isAuthenticated: req.isAuthenticated(), info: data, category: "Masters"})
        }  catch(err) {
            res.render('errormes.ejs', {error: "Error in getMasters: " + err, isAuthenticated: req.isAuthenticated()})
        }

    },
    getOther: async (req, res) => {
        try {
            let data = await Painter.find().lean()
            res.render('judging.ejs', { isAuthenticated: req.isAuthenticated(), info: data, category: "Other"})
        } catch(err) {
            res.render('errormes.ejs', {error: "Error in getOther: " + err, isAuthenticated: req.isAuthenticated()})
        }
    },    
    addEntry: async (req, res) => {
        try {
            const titleCasify = str => str.split(' ').map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ')
            const query = Painter.where({id: Number(req.body.entryId)})
            const painter = await query.findOne();
            const category = req.body.category
            let currentPrizes = painter.prizes
            if (category === "Standard") {
                await Painter.findOneAndUpdate({id: Number(req.body.entryId)}, {
                    judged: req.body.judged,
                    prizes: {
                        ...currentPrizes,
                        medal: req.body.medals,
                        standardBestOfShow: req.body.standardBestOfShow == "on",
                        junBestOfShow: req.body.junBestOfShow == "on",
                    }
                })
            } else if (category === "Masters") {
                await Painter.findOneAndUpdate({id: Number(req.body.entryId)}, {
                    judged: req.body.judged,
                    prizes: {
                        ...currentPrizes,
                        medal: req.body.medals,
                        mastersBestOfShow: req.body.mastersBestOfShow == "on",
                    }
                })

            } else if (category === "Other") {
                await Painter.findOneAndUpdate({id: Number(req.body.entryId)}, {
                    prizes: {
                        ...currentPrizes,
                        corrr: req.body.corrr == "on",
                        peoplesChoice: req.body.peoplesChoice == "on",
                        sponsors: req.body.sponsors ? req.body.sponsors.split(',').map(e => e.trim()).filter(e => e).map(sponsor => titleCasify(sponsor)) : []
                    }
                })

            }
            res.redirect(`/judging${category}`)
        } 
        catch (err) {
            res.render('errormes.ejs', {error: "Error in addEntry in judging.js: " + err, isAuthenticated: req.isAuthenticated()})     
        } 
    }

}