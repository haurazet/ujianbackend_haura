const {db}=require('./../connection')
const {uploader}=require('./../helpers/uploader')
const fs=require('fs')


module.exports={
    addproduct:(req,res)=>{
        try {
            const path='/PROD' //terserah namanya
            const upload=uploader(path,'TES').fields([{name:'image'}])
        
            upload(req,res,(err)=>{
                if(err){
                    return res.status(500).json({message: 'upload picture failed !',error:err.message})
                }
                console.log('lewat') //pada tahap ini foto berhasil di upload
                const {image}=req.files;
                console.log(image)
                const imagePath = image ? path + '/' + image[0].filename : null;
                console.log(imagePath)
                console.log(req.body.data)
                const data = JSON.parse(req.body.data); //mengubah json menjadi objek
                console.log(data,1)
                data.imagepath=imagePath
                console.log(data,2)
                var sql=`INSERT INTO product SET ?`
                db.query(sql,data,(err,result)=>{
                    if (err){
                        fs.unlinkSync('./public' + imagePath);
                        return res.status(500).json({message:"There is an error on the server. Please contact the administrator.",error:err.message});
                    }
                    sql=`SELECT * FROM product`
                    db.query(sql,(err1,result1)=>{
                        if(err1) return res.status(500).send(err1)
                        return res.status(200).send(result1)
                    })
                })
            })
        }catch(error){
            return res.status(500).send(error)
        }
    },
    getProduct:(req,res)=>{
        var sql=`SELECT * FROM product`
        db.query(sql,(err1,result1)=>{
            if(err1) return res.status(500).send(err1)
            return res.status(200).send(result1)
        })
    },
    deleteProduct:(req,res)=>{
        const {id}=req.params
        var sql=`SELECT * FROM product WHERE product_id=${id}`
        db.query(sql,(err,result)=>{
            if (err) res.status(500).send(err)
            if (result.length){
                if(result[0].imagepath){
                    fs.unlinkSync('./public'+result[0].imagepath)
                }
                sql=`DELETE FROM product WHERE product_id=${id}`
                db.query(sql,(err,result2)=>{
                    if (err) res.status(500).send(err)
                    var sql=`SELECT * FROM product`
                    db.query(sql,(err1,result1)=>{
                        if(err1) return res.status(500).send(err1)
                        return res.status(200).send(result1)
                    })
                })
            } else {
                return res.status(500).send({message:'nggak ada woy idnya'})
            }
        })
    },
    editProduct:(req,res)=>{
        const {id}=req.params
        var sql=`SELECT * FROM product WHERE product_id=${id}`
        db.query(sql,(err,result)=>{
            if(err) res.status(500).send(err)
            if(result.length){ 
                try {
                    const path='/PROD' //terserah namanya
                    const upload=uploader(path,'TES').fields([{name:'image'}])
                    upload(req,res,(err)=>{ 
                        if(err){
                            return res.status(500).json({message: 'upload picture failed !',error:err.message})
                        }
                        console.log('lewat') //pada tahap ini foto berhasil di upload
                        const {image}=req.files;
                        console.log(image)
                        const imagePath = image ? path + '/' + image[0].filename : null;
                        const data = JSON.parse(req.body.data); //mengubah json menjadi objek
                        if(imagePath){
                            data.imagepath=imagePath
                        }
                        sql=`UPDATE product SET ? WHERE product_id=${id}`
                        db.query(sql,data,(err1,result1)=>{
                            if (err1){
                                if(imagePath){
                                    fs.unlinkSync('./public' + imagePath);
                                }
                                return res.status(500).json({message:"There is an error on the server. Please contact the administrator.",error:err.message});
                            }
                            if(imagePath){ //hapus foto lama
                                if(result[0].imagepath){
                                    fs.unlinkSync('./public'+result[0].imagepath)
                                }
                            }
                            sql=`SELECT * FROM product`
                            db.query(sql,(err1,result1)=>{
                                if(err1) return res.status(500).send(err1)
                                return res.status(200).send(result1)
                            })
                        })
                    })
                }catch(error){
                    return res.status(500).send({message:'catch error'})
                }
            }else{
                return res.status(500).send({message:'nggak ada idnya oy'})
            }
        })
    },
}
