const express = require("express")
const axios = require("axios")
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
const PORT = 4005


app.post("/events",(req,res)=>{

    const event = req.body;

    axios.post("http://localhost:4000/events",event).then(()=>{
        console.log("Successfully emmited event to PORT 4000");
    }).catch((error)=>{
        console.log(error);
    });
    axios.post("http://localhost:4001/events",event).then(()=>{
        console.log("Successfully emmited event to PORT 4001");
    }).catch((error)=>{
        console.log(error);
    });;
    axios.post("http://localhost:4002/events",event).then(()=>{
        console.log("Successfully emmited event to PORT 4002");
    }).catch((error)=>{
        console.log(error);
    });;

    res.send({status:200})

})

app.listen(PORT,()=>{
    console.log(`Event Bus live at port ${PORT}.`);
})