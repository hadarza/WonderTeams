const express = require('express')
const app = express()
const path = require('path')
const crypto = require('crypto')
const multer = require('multer')
const {GridFsStorage} = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const DashBoard = require('./routes/DashBoard')
const User = require('./routes/user')

var cors = require('cors');
//connect to DB
mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true, useUnifiedTopology: true },
(err) => {
    if(err) console.log(err) 
    else console.log("mongdb is connected");
    }
)

app.use(express.json())
app.use(cors());
app.use(methodOverride('_method'))

let gfs;
mongoose.connection.once('open', () => {
    //Init stream
     gfs = Grid(mongoose.connection.db,mongoose.mongo);
     gfs.collection('uploads')
  })
  

  const storage = new GridFsStorage({
    url: process.env.DB_CONNECT,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });
  const upload = multer({ storage });


//Router Middlewares
app.use('/api/user',User)
app.use('/api/DashBoard',DashBoard)

app.listen(5000, ()=>{console.log('Server is up and running')})