
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
            /* For next year, this needs to accommodate Standard and Master best of show. RIP my schema */
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

    seed: async (req, res) => {
        const data = [
            {   
                numOfModels: 3,
                competition: 0,
                judged: 0,
                prizes: {
                    medal: "",
                    standardBestOfShow: false,
                    junBestOfShow: false,
                    mastersBestOfShow: false,
                    corrr: false,
                    peoplesChoice: false,
                    sponsors: []
                }
            },
            {
                numOfModels: 5,
                competition: 0,
                judged: 0,
                prizes: {
                    medal: "",
                    standardBestOfShow: false,
                    junBestOfShow: false,
                    mastersBestOfShow: false,
                    corrr: true,
                    peoplesChoice: false,
                    sponsors: []
                }
            },
            {
                numOfModels: 6,
                competition: 0,
                judged: 0,
                prizes: {
                    medal: "",
                    standardBestOfShow: false,
                    junBestOfShow: false,
                    mastersBestOfShow: false,
                    corrr: false,
                    peoplesChoice: false,
                    sponsors: ["Taro"]
                }
            },
            {
                numOfModels: 2,
                competition: 1,
                judged: 0,
                prizes: {
                    medal: "",
                    standardBestOfShow: false,
                    junBestOfShow: false,
                    mastersBestOfShow: false,
                    corrr: false,
                    peoplesChoice: false,
                    sponsors: []
                }
            },
            {
                numOfModels: 4,
                competition: 1,
                judged: 1,
                prizes: {
                    medal: "commended",
                    standardBestOfShow: false,
                    junBestOfShow: false,
                    mastersBestOfShow: false,
                    corrr: false,
                    peoplesChoice: false,
                    sponsors: []
                }
            },
            {
                numOfModels: 2,
                competition: 1,
                judged: 1,
                prizes: {
                    medal: "bronze",
                    standardBestOfShow: false,
                    junBestOfShow: false,
                    mastersBestOfShow: false,
                    corrr: false,
                    peoplesChoice: false,
                    sponsors: ["Blacksun"]
                }
            },
            {
                numOfModels: 3,
                competition: 1,
                judged: 1,
                prizes: {
                    medal: "silver",
                    standardBestOfShow: false,
                    junBestOfShow: false,
                    mastersBestOfShow: false,
                    corrr: false,
                    peoplesChoice: false,
                    sponsors: []
                }
            },
            {
                numOfModels: 7,
                competition: 1,
                judged: 1,
                prizes: {
                    medal: "gold",
                    standardBestOfShow: false,
                    junBestOfShow: false,
                    mastersBestOfShow: false,
                    corrr: false,
                    peoplesChoice: false,
                    sponsors: []
                }
            },
            {
                numOfModels: 7,
                competition: 1,
                judged: 2,
                prizes: {
                    medal: "silver",
                    standardBestOfShow: false,
                    junBestOfShow: false,
                    mastersBestOfShow: false,
                    corrr: false,
                    peoplesChoice: false,
                    sponsors: []
                }
            },
            {
                numOfModels: 3,
                competition: 1,
                judged: 2,
                prizes: {
                    medal: "gold",
                    standardBestOfShow: false,
                    junBestOfShow: true,
                    mastersBestOfShow: false,
                    corrr: true,
                    peoplesChoice: false,
                    sponsors: []
                }
            },
            {
                numOfModels: 3,
                competition: 2,
                judged: 0,
                prizes: {
                    medal: "",
                    standardBestOfShow: false,
                    junBestOfShow: false,
                    mastersBestOfShow: false,
                    corrr: false,
                    peoplesChoice: false,
                    sponsors: []
                }
            },
            {
                numOfModels: 3,
                competition: 2,
                judged: 1,
                prizes: {
                    medal: "commended",
                    standardBestOfShow: false,
                    junBestOfShow: false,
                    mastersBestOfShow: false,
                    corrr: false,
                    peoplesChoice: false,
                    sponsors: []
                }
            },
            {
                numOfModels: 4,
                competition: 2,
                judged: 1,
                prizes: {
                    medal: "silver",
                    standardBestOfShow: false,
                    junBestOfShow: false,
                    mastersBestOfShow: false,
                    corrr: false,
                    peoplesChoice: false,
                    sponsors: []
                }
            },
            {
                numOfModels: 4,
                competition: 2,
                judged: 2,
                prizes: {
                    medal: "silver",
                    standardBestOfShow: false,
                    junBestOfShow: false,
                    mastersBestOfShow: false,
                    corrr: false,
                    peoplesChoice: false,
                    sponsors: []
                }
            },
            {
                numOfModels: 4,
                competition: 2,
                judged: 2,
                prizes: {
                    medal: "gold",
                    standardBestOfShow: true,
                    junBestOfShow: false,
                    mastersBestOfShow: false,
                    corrr: true,
                    peoplesChoice: false,
                    sponsors: ["Sphere", "Taro"]
                }
            },
            {
                numOfModels: 4,
                competition: 3,
                judged: 0,
                prizes: {
                    medal: "",
                    standardBestOfShow: false,
                    junBestOfShow: false,
                    mastersBestOfShow: false,
                    corrr: false,
                    peoplesChoice: false,
                    sponsors: []
                }
            },
            {
                numOfModels: 2,
                competition: 3,
                judged: 1,
                prizes: {
                    medal: "commended",
                    standardBestOfShow: false,
                    junBestOfShow: false,
                    mastersBestOfShow: false,
                    corrr: false,
                    peoplesChoice: false,
                    sponsors: []
                }
            },
            {
                numOfModels: 6,
                competition: 3,
                judged: 1,
                prizes: {
                    medal: "bronze",
                    standardBestOfShow: false,
                    junBestOfShow: false,
                    mastersBestOfShow: false,
                    corrr: false,
                    peoplesChoice: false,
                    sponsors: []
                }
            },
            {
                numOfModels: 4,
                competition: 3,
                judged: 2,
                prizes: {
                    medal: "silver",
                    standardBestOfShow: false,
                    junBestOfShow: false,
                    mastersBestOfShow: false,
                    corrr: false,
                    peoplesChoice: false,
                    sponsors: []
                }
            },
            {
                numOfModels: 4,
                competition: 3,
                judged: 2,
                prizes: {
                    medal: "gold",
                    standardBestOfShow: false,
                    junBestOfShow: false,
                    mastersBestOfShow: false,
                    corrr: false,
                    peoplesChoice: false,
                    sponsors: []
                }
            },
            {
                numOfModels: 2,
                competition: 3,
                judged: 2,
                prizes: {
                    medal: "gold",
                    standardBestOfShow: false,
                    junBestOfShow: false,
                    mastersBestOfShow: true,
                    corrr: false,
                    peoplesChoice: false,
                    sponsors: []
                }
            },
        ]
        try {
            let id = 1
            for (let item of data) {
                await Painter.create({id: id, fullName: `Person ${id}`, ...item})
                id++
            }
            res.render('errormes.ejs', {error: "DB seeded successfully"})
        } catch(err) {
            res.render('errormes.ejs', {error: err})
        }
    }

}

