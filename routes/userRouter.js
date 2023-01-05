const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/register', userCtrl.register)

router.post('/activation', userCtrl.activateEmail)
router.post('/login', userCtrl.login)

router.post('/forgot', userCtrl.forgotPassword)

router.post('/reset', auth, userCtrl.resetPassword)
router.get('/refresh_token', userCtrl.getAccessToken)
router.get('/logout', userCtrl.logout)

router.get('/infor', auth,  userCtrl.getUser)
router.get('/all_infor', auth, authAdmin, userCtrl.getUsersAllInfor)

router.patch('/update', auth, userCtrl.updateUser)

router.patch('/update_role/:id', auth, authAdmin, userCtrl.updateUsersRole)

router.delete('/delete/:id', auth, authAdmin, userCtrl.deleteUser)
router.patch('/addcart', auth, userCtrl.addCart)
router.patch('/addfavorite', auth, userCtrl.addFavorite)

router.get('/history', auth, userCtrl.history)

module.exports = router