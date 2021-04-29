const db = require('../models')
const Axios = require('axios')
const Member = db.Members;

// create and save a new Member
const create = async (req, res) => {
    // image validation
    if(req.body.image===undefined){
        return res.status(400).json({
            ok: false,
            msj: 'image is required'
        })
    }
   
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
    }

    // fileExtension validation
    const url = req.body.image;
    const response = await Axios({
        method: 'GET',
        url: url,
        responseType: 'stream'
    })
    const fileExtension = await response.headers['content-type'].split('/')[0] || null

    if(fileExtension==='image'){
        // create a member
        try{
            const member = await Member.create({
                name: req.body.name.trim(),
                facebookUrl: req.body.facebookUrl || null,
                instagramUrl: req.body.instagramUrl || null,
                linkedinUrl: req.body.linkedinUrl || null,
                image: req.body.image,
                description: req.body.description || null
            })
            res.json({
                ok: true,
                member: member.dataValues
            })
        }catch(e){
            res.status(400).json({
                ok: false,
                error: 'failed to create member.'
            })
        }
    }  
}

// get all members
const findAll = async (req, res) => {
    try{
        const members = await Member.findAll();
        res.json({
            ok: true,
            members
        })
    }catch(e){
        res.status(400).json({
            ok: false,
            msj: 'failed to get all members.'
        })
    }
}

module.exports = {
    create,
    findAll
}