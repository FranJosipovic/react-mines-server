const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')

const {ObjectId} = mongoose.Schema.Types

const leaderBoardSchema = new mongoose.Schema({
    email : {type : String, required:"true"},
    timePlayed : { 
        forDisplay : {type : String},
        forSort : {type : Number}},
    dificulty : {type : String, required : "true"},
    jokersUsed : {type : Number, required :"true"}
},{timestamps:true})

mongoose.model('Item',leaderBoardSchema)