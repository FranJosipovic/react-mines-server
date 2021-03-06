const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require('mongoose')

require('dotenv').config()
 
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

app.use(cors());
app.use(express.json())
app.use(require('./routes/leaderboard'))

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});