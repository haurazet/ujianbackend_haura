const crypto=require('crypto')

//ini buat encryp password

module.exports=(password)=>{
    return crypto.createHmac('sha256','puripuri').update(password).digest('hex')
}