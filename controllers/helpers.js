
const Painter = require('../models/Painter')
const User = require('../models/User')
const Year = require('../models/Year')

module.exports = {
    // For me to save stats for a given year before I purge the DB. 
    saveStats: async (req, res) => {
        try { 
            let data = await Painter.find().lean()
            const models = data.reduce((acc, cur) => acc + cur.numOfModels, 0)
            const juniors = data.filter(e => e.junior).length
            const adults = data.length - juniors
            const bestOfShow = data.find(e => e.prizes.bestOfShow).fullName
            const junBestOfShow = data.find(e => e.prizes.junBestOfShow).fullName
            const peoplesChoice = data.find(e => e.prizes.peoplesChoice).fullName
            const sponsors = Array.from(new Set(data.reduce((acc, cur) => cur.prizes.sponsors ? acc.concat(cur.prizes.sponsors) : acc, [])))
            const corrr = data.filter(e => e.prizes.corrr).length

            const date = new Date()
            let year = date.getFullYear()
            const fms2024 = new Date("27 Jul 2024")
            if (date < fms2024) {year = 2023}

            await Year.create({year: year, totalModels: models, juniors: juniors, adults: adults, bestOfShow: bestOfShow, peoplesChoice: peoplesChoice, sponsors: sponsors, corrr: corrr})
            res.render('errormes.ejs', {error: `Year ${year} added successfully.`}) // Sue me

        } catch(err) {
            res.render('errormes.ejs', {error: err})
        }        
        
    },

}

