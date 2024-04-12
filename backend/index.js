const rootRouter = require('./routes/index')
const cors = require('cors');
const express = require("express")
const JWT_SECRET = require('./config')
const app = express();

const PORT = 3000;
app.use(cors());
app.use(express.json())
app.use('/api/v1' , rootRouter)

app.listen(PORT, (err) =>{
     if(err) console.log(err);
     else console.log(`Listening on port numeber ${PORT}`);
});