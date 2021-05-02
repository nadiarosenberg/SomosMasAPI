const Axios = require('axios')
const checkImage = async (req, res) => {
    // image validation
    if(req.body.image===undefined){
        res.status(400).json({
            ok: false,
            msj: 'image is required'
        })
        return false
    }
    // fileExtension validation
    const url = req.body.image;
    try{
        const response = await Axios({
            method: 'GET',
            url: url,
            responseType: 'stream'
        })
        const fileExtension = await response.headers['content-type'].split('/')[0] || null
        if(fileExtension==='image'){
            return true
        }else{
            return false
        }
    }catch(e){
        res.status(400).json({
            ok: false,
            msj: 'invalid image'
        })
        return false
    }
}

const checkName = async (req, res) => {
    // name validation
    if(req.body.name===undefined){
        return res.status(400).json({
            ok: false,
            msj: 'name is required'
        })
    }else if(req.body.name.trim()===""){
        return res.status(400).json({
            ok: false,
            msj: 'must be at least one character'
        })
    }else{
        return true
    }
}

module.exports = {
    checkImage,
    checkName
}