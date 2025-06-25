const Painter = require('../models/Painter')

module.exports = {
    getMain: (req, res) => {
        res.render('judging.ejs', { isAuthenticated: req.isAuthenticated(), category: null})
    }, 
    getFigStandard: async (req, res) => {
        try {
            let data = await Painter.find().lean()
            data = data.filter(e => e.competition == 2)
            res.render('judging.ejs', { isAuthenticated: req.isAuthenticated(), info: data, category: "Figures Standard"})
        }
        catch(err) {
            res.render('errormes.ejs', {error: "Error in getFigStandard: " + err, isAuthenticated: req.isAuthenticated()})
        }
    },
    getFigMasters: async (req, res) => {
        try {
            let data = await Painter.find().lean()
            data = data.filter(e => e.competition == 3)
            res.render('judging.ejs', { isAuthenticated: req.isAuthenticated(), info: data, category: "Figures Masters"})
        }
        catch(err) {
            es.render('errormes.ejs', {error: "Error in getFigMasters: " + err, isAuthenticated: req.isAuthenticated()})
        }
    }, 
    getVroomStandard: async (req, res) => {
        try {
            let data = await Painter.find().lean()
            data = data.filter(e => e.competition == 4)
            res.render('judging.ejs', { isAuthenticated: req.isAuthenticated(), info: data, category: "Vehicles Standard"})
        }  catch(err) {
            res.render('errormes.ejs', {error: "Error in getVroomStandard: " + err, isAuthenticated: req.isAuthenticated()})
        }

    },
    getVroomMasters: async (req, res) => {
        try {
            let data = await Painter.find().lean()
            data = data.filter(e => e.competition == 5)
            res.render('judging.ejs', { isAuthenticated: req.isAuthenticated(), info: data, category: "Vehicles Masters"})
        }  catch(err) {
            res.render('errormes.ejs', {error: "Error in getVroomMasters: " + err, isAuthenticated: req.isAuthenticated()})
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
            if (category === "Figures Standard" || category === "Vehicles Standard") {
                await Painter.findOneAndUpdate({id: Number(req.body.entryId)}, {
                    judged: req.body.judged,
                    prizes: {
                        ...currentPrizes,
                        medal: req.body.medals,
                        standardBestOfShow: req.body.standardBestOfShow == "on",
                        junBestOfShow: req.body.junBestOfShow == "on",
                    }
                })
            } else if (category === "Figures Masters" || category == "Vehicles Masters") {
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