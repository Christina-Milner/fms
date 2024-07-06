const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const homeController = require('../controllers/home')
const regController = require('../controllers/reg')
const judgingController = require('../controllers/judging')
const helpersController = require('../controllers/helpers')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// Simple stuff
router.get('/', homeController.getIndex)
router.get('/help', homeController.getHelp)
router.get('/stats', homeController.getStats)

// More complicated stuff
// Registration and multi-use
router.get('/registration', regController.getMain)
router.post('/addEntryReg', regController.addEntry)
router.get('/numOfEntries', homeController.getNum)
router.get('/ID_:id', ensureAuth, homeController.getEntry)
router.post('/postEntry', regController.postEntry)
router.get('/checkFor_:prize', homeController.checkPrize)

//Judging
router.get('/judging', judgingController.getMain)
router.get('/judgingStandard', judgingController.getStandard)
router.get('/judgingMasters', judgingController.getMasters)
router.get('/judgingOther', judgingController.getOther)
router.post('/addEntryJudge', judgingController.addEntry)

// Filters
router.get('/filters', homeController.getFilters)
router.get('/filters:prize', ensureAuth, homeController.filterPrize)


//Login
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)

// Admin stuff

router.get('/saveStats', ensureAuth, helpersController.saveStats)
router.get('/seed', ensureAuth, helpersController.seed)

module.exports = router