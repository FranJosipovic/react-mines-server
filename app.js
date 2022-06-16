const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const mongoose = require('mongoose')
require('dotenv').config()
const Item = mongoose.model("Item")

mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
})
mongoose.connection.on('connected',()=>{
  console.log('connected sucesfully')
})
mongoose.connection.on('error',(err)=>{
  console.log('error connecting',err)
})

require('./modals/leaderboardModal.js')

app.use(express.json())
app.use(require('./routes/leaderboard'))
app.get('/getLeaderboard/:sortType',(req,res) => {
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

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});