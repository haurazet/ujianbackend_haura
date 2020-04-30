const {db}=require('../connection')
const {uploader}=require('../helpers/uploader')
const fs=require('fs')

module.exports={
    addstore:(req,res)=>{
        if(req.body.branch_name===''){
            return res.status(500).send('please input branchname')
        }
        var sql=`INSERT INTO store SET ?`
        db.query(sql,req.body,(err,result)=>{
            if (err) return res.status(500).send(err)
            db.query('SELECT * FROM store',(err,result1)=>{
                if (err) return res.status(500).send(err)
                return res.status(200).send(result1)
            })
        })
    },
    deletestore:(req,res)=>{
        var sql=`DELETE FROM store WHERE store_id=${req.params.id}`
        db.query(sql,(err,result)=>{
            if(err) return res.status(500).send(err)
            db.query('SELECT * FROM store',(err,result1)=>{
                if (err) return res.status(500).send(err)
                return res.status(200).send(result1)
            })
        })
    },
    editstore:(req,res)=>{
        var sql=`UPDATE store SET ? WHERE store_id=${req.params.id}`
        db.query(sql,req.body,(err,result)=>{
            if(err) return res.status(500).send(err)
            db.query('SELECT * FROM store',(err,result1)=>{
                if (err) return res.status(500).send(err)
                return res.status(200).send(result1)
            })
        })
    },
    getstore:(req,res)=>{
        db.query('SELECT * FROM store',(err,result)=>{
            if (err) return res.status(500).send(err)
            return res.status(200).send(result)
        })
    }

}