const express=require('express')
const {StoreController}=require('./../controllers')

const router=express.Router()

router.post('/add',StoreController.addstore)
router.delete('/delete/:id',StoreController.deletestore)
router.put('/edit/:id',StoreController.editstore)
router.get('/get',StoreController.getstore)

module.exports = router