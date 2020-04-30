const mysql=require('mysql')
const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Maroon511', //dr workbench
    database: 'ujianbackend',
    port: '3306'
})

db.connect((err)=>{
    if(err){
        console.log(err)
    }
    console.log('connect sudah')
})

module.exports=db