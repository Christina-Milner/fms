
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
                fullName: "Person 1",
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
                fullName: "Person 2",
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
            {fullName: "Person 3",
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
            {fullName: "Person 4",
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
            {fullName: "Person 5",
                numOfModels: 4,
                competition: 1,
                judged: 1,
                prizes: {
                    medal: "Commended",
                    standardBestOfShow: false,
                    junBestOfShow: false,
                    mastersBestOfShow: false,
                    corrr: false,
                    peoplesChoice: false,
                    sponsors: []
                }
            },
            {fullName: "Person 6",
                numOfModels: 2,
                competition: 1,
                judged: 1,
                prizes: {
                    medal: "Bronze",
                    standardBestOfShow: false,
                    junBestOfShow: false,
                    mastersBestOfShow: false,
                    corrr: false,
                    peoplesChoice: false,
                    sponsors: ["Blacksun"]
                }
            },
            {fullName: "Person 7",
                numOfModels: 3,
                competition: 1,
                judged: 1,
                prizes: {
                    medal: "Silver",
                    standardBestOfShow: false,
                    junBestOfShow: false,
                    mastersBestOfShow: false,
                    corrr: false,
                    peoplesChoice: false,
                    sponsors: []
                }
            },
            {fullName: "Person 8",
                numOfModels: 7,
                competition: 1,
                judged: 1,
                prizes: {
                    medal: "Gold",
                    standardBestOfShow: false,
                    junBestOfShow: false,
                    mastersBestOfShow: false,
                    corrr: false,
                    peoplesChoice: false,
                    sponsors: []
                }
            },
            {fullName: "Person 8",
                numOfModels: 7,
                competition: 1,
                judged: 2,
                prizes: {
                    medal: "Silver",
                    standardBestOfShow: false,
                    junBestOfShow: false,
                    mastersBestOfShow: false,
                    corrr: false,
                    peoplesChoice: false,
                    sponsors: []
                }
            },
            {fullName: "Person 9",
                numOfModels: 3,
                competition: 1,
                judged: 2,
                prizes: {
                    medal: "Gold",
                    standardBestOfShow: false,
                    junBestOfShow: true,
                    mastersBestOfShow: false,
                    corrr: true,
                    peoplesChoice: false,
                    sponsors: []
                }
            },
            {fullName: "Person 10",
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
            {fullName: "Person 11",
                numOfModels: 3,
                competition: 2,
                judged: 1,
                prizes: {
                    medal: "Commended",
                    standardBestOfShow: false,
                    junBestOfShow: false,
                    mastersBestOfShow: false,
                    corrr: false,
                    peoplesChoice: false,
                    sponsors: []
                }
            },
            {fullName: "Person 12",
                numOfModels: 4,
                competition: 2,
                judged: 1,
                prizes: {
                    medal: "Silver",
                    standardBestOfShow: false,
                    junBestOfShow: false,
                    mastersBestOfShow: false,
                    corrr: false,
                    peoplesChoice: false,
                    sponsors: []
                }
            },
            {fullName: "Person 13",
                numOfModels: 4,
                competition: 2,
                judged: 2,
                prizes: {
                    medal: "Silver",
                    standardBestOfShow: false,
                    junBestOfShow: false,
                    mastersBestOfShow: false,
                    corrr: false,
                    peoplesChoice: false,
                    sponsors: []
                }
            },
            {fullName: "Person 14",
                numOfModels: 4,
                competition: 2,
                judged: 2,
                prizes: {
                    medal: "Gold",
                    standardBestOfShow: true,
                    junBestOfShow: false,
                    mastersBestOfShow: false,
                    corrr: true,
                    peoplesChoice: false,
                    sponsors: ["Sphere", "Taro"]
                }
            },
            {fullName: "Person 15",
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
            {fullName: "Person 16",
                numOfModels: 2,
                competition: 3,
                judged: 1,
                prizes: {
                    medal: "Commended",
                    standardBestOfShow: false,
                    junBestOfShow: false,
                    mastersBestOfShow: false,
                    corrr: false,
                    peoplesChoice: false,
                    sponsors: []
                }
            },
            {fullName: "Person 17",
                numOfModels: 6,
                competition: 3,
                judged: 1,
                prizes: {
                    medal: "Bronze",
                    standardBestOfShow: false,
                    junBestOfShow: false,
                    mastersBestOfShow: false,
                    corrr: false,
                    peoplesChoice: false,
                    sponsors: []
                }
            },
            {fullName: "Person 18",
                numOfModels: 4,
                competition: 3,
                judged: 2,
                prizes: {
                    medal: "Silver",
                    standardBestOfShow: false,
                    junBestOfShow: false,
                    mastersBestOfShow: false,
                    corrr: false,
                    peoplesChoice: false,
                    sponsors: []
                }
            },
            {fullName: "Person 19",
                numOfModels: 4,
                competition: 3,
                judged: 2,
                prizes: {
                    medal: "Gold",
                    standardBestOfShow: false,
                    junBestOfShow: false,
                    mastersBestOfShow: false,
                    corrr: false,
                    peoplesChoice: false,
                    sponsors: []
                }
            },
            {fullName: "Person 20",
                numOfModels: 2,
                competition: 3,
                judged: 2,
                prizes: {
                    medal: "Gold",
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
                await Painter.create({id: id, ...item})
                id++
            }
            res.render('errormes.ejs', {error: "DB seeded successfully"})
        } catch(err) {
            res.render('errormes.ejs', {error: err})
        }
    }

}

