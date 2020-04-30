const {db}=require('../connection')
const {uploader}=require('../helpers/uploader')
const fs=require('fs')

module.exports={
    getinventory:(req,res)=>{
        var sql=`   SELECT i.*, p.nama, s.branch_name
                    FROM inventory i
                        JOIN product p
                        USING(product_id)
                        LEFT JOIN store s
                        USING(store_id)`
        db.query(sql,(err,result)=>{
            if (err) return res.status(500).send(err)
            return res.status(200).send(result)
        })
    },
    addinventory:(req,res)=>{
        const {product_id,store_id,inventory_id,inventory}=req.body
        datadetails={
            product_id,
            store_id,
            inventory
        }
        var sql=`   INSERT INTO inventory SET ?`
        db.query(sql, datadetails,(err,result)=>{
            if(err) return res.status(500).send({message:'error add new inventory'})
            var sql=`   SELECT i.*, p.nama, s.branch_name
                        FROM inventory i
                            JOIN product p
                            USING(product_id)
                            LEFT JOIN store s
                            USING(store_id)`
            db.query(sql,(err,result1)=>{
                if (err1) return res.status(500).send(err1)
                return res.status(200).send(result1)
            })
        })
    },
    editinventory:(req,res)=>{
        const {inventory_id}=req.params
        const {inventory}=req.body
        var sql=`   UPDATE inventory SET inventory=${inventory}
                    WHERE inventory_id=${inventory_id}`
        db.query(sql,(err,result)=>{
            if(err) return res.status(500).send({message:'error add new inventory'})
            var sql=`   SELECT i.*, p.nama, s.branch_name
                        FROM inventory i
                            JOIN product p
                            USING(product_id)
                            LEFT JOIN store s
                            USING(store_id)`
            db.query(sql,(err1,result1)=>{
                if (err1) return res.status(500).send(err1)
                return res.status(200).send(result1)
            })
        })
    },
    deleteinventory:(req,res)=>{
        var sql=`DELETE FROM inventory WHERE inventory_id=${req.params.inventory_id}`
        db.query(sql,(err,result)=>{
            if(err) return res.status(500).send(err)
            var sql=`   SELECT i.*, p.nama, s.branch_name
                        FROM inventory i
                            JOIN product p
                            USING(product_id)
                            LEFT JOIN store s
                            USING(store_id)`
            db.query(sql,(err1,result1)=>{
                if (err1) return res.status(500).send(err)
                return res.status(200).send(result1)
            })
        })
    }

}