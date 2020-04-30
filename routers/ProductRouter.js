const express=require('express')
const {ProductController}=require('./../controllers')

const router=express.Router()

router.post('/add',ProductController.addproduct)
router.get('/get',ProductController.getProduct)
router.delete('/delete/:id',ProductController.deleteProduct)
router.post('/edit/:id',ProductController.editProduct)

module.exports = router