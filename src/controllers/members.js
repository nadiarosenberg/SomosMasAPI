const db = require('../models')
const Axios = require('axios')
const Member = db.Members;
const memberMiddleware = require('./members.middleware')

// create and save a new Member
const create = async (req, res) => {

    const isValidImage = await memberMiddleware.checkImage(req, res)
    const isValidName = await memberMiddleware.checkName(req, res)
    
    if(isValidImage && isValidName){
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
                member
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

// get one member by id
const findOne = async (req, res) => {
    const id = req.params.id;
    try{
        let member = await Member.findByPk(id)
        res.json({
            ok: true,
            member
        })
    }catch(e){
        res.status(400).json({
            ok: false,
            msj: `failed to get member with id ${id}`
        })
    }
}

// update a member by id
const update = async (req, res) => {
    const id = req.params.id;
    if(isNaN(id)){
        res.status(400).json({
            ok: false,
            msj: 'invalid id'
        })
        return false
    }
    const isValidName = await memberMiddleware.checkName(req, res)
    let isValidImage = false
    if(req.body.image!==undefined){
        isValidImage = await memberMiddleware.checkImage(req, res)
    }else{
        isValidImage = true
    }
    if(isValidImage && isValidName){
        try{
            await Member.update(req.body, {
                where: {
                  id
                }
            });
            res.json({
                ok: true,
                msj: 'member updated successfully'
            })
        }catch(e){
            res.status(400).json({
                ok: false,
                msj: 'failed to update member'
            })
        }
    }
}

module.exports = {
    create,
    findAll,
    findOne,
    update
}