const express=require('express')
const {TableController}=require('./../controllers')

const router=express.Router()

router.post('/add',TableController.addinventory)
router.get('/get',TableController.getinventory)
router.post('/edit/:inventory_id',TableController.editinventory)
router.delete('/delete/:inventory_id',TableController.deleteinventory)

module.exports = router