const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Item = mongoose.model("Item")
const emailExistence = require('email-existence')
const validator = require('validator');


router.post('/addToLeaderboard',(req,res) => {
    const {email,dificulty,timePlayedforDisplay,timePlayedforSort,jokersUsed} = req.body
    if(!email){
        return res.status(422).json({error:"moras unijeti email"})
    }
    if(validator.isEmail(`${email}`)){
        emailExistence.check(`${email}`, (err,response) => {
            if(response){
              const newItem = new Item({
                    email,
                    timePlayed : {
                        forDisplay : timePlayedforDisplay,
                        forSort : timePlayedforSort},
                    dificulty,
                    jokersUsed
                })
                newItem.save()
                .then(suc=>{
                    console.log(suc);
                    return res.status(200).json({success:"uspjesno spremljeno"})
                })
            }else if(err){
                return res.status(422).json({error:err})
            }
        });
    }
    else{
        return res.status(422).json({error:"email nije validan"})
    }
})

router.get('/getLeaderboard/:sortType',(req,res) => {
    const sortType = req.params
    if(sortType.sortType === 'default'){
        Item.find().sort({email : 1}).then(
            result => {
                return res.status(200).json({result})
            }
        ).catch(err=>{
            console.log(err);
        })
    }else if(sortType.sortType === 'time'){
        Item.find().sort({"timePlayed.forSort" : 1}).then(
            result => {
                return res.status(200).json({result})
            }
        ).catch(err=>{
            console.log(err);
        })
    }else if(sortType.sortType === 'dificulty'){
        Item.find().sort({dificulty : -1}).then(
            result => {
                return res.status(200).json({result})
            }
        ).catch(err=>{
            console.log(err);
        })
    }else if(sortType.sortType === 'date'){
        Item.find().sort({createdAt : -1}).then(
            result => {
                return res.status(200).json({result})
            }
        ).catch(err=>{
            console.log(err);
        })
    }else if(sortType.sortType === 'jokersUsed'){
        Item.find().sort({jokersUsed : 1}).then(
            result => {
                return res.status(200).json({result})
            }
        ).catch(err=>{
            console.log(err);
        })
    }
})

module.exports = router