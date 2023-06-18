const mongoose = require('mongoose')

const PainterSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    fullName: String,
    numOfModels: Number,
    inCompetition: Boolean,
    junior: Boolean,
    judged: mongoose.Schema.Types.Mixed,
    prizes: {
        medal: String,
        bestOfShow: Boolean,
        junBestOfShow: Boolean,
        corrr: Boolean,
        peoplesChoice: Boolean,
        sponsors: mongoose.Schema.Types.Mixed
    }
  })

  module.exports = mongoose.model('Painter', PainterSchema)