const express=require("express");
const fs=require("fs");
const path=require("path");
const cors=require("cors");
const { error } = require("console");

const app=express();
app.use(cors());
const PORT=process.env.PORT || 3000;

app.use(express.static("public"));
app.use("/media",express.static("media"));

const mediaPath=path.join(__dirname,"media");

//API to get media files dynamically
app.get("/media/:type",(req,res) => {
const type=req.params.type; //videos,slides or presentation
const folderPath=path.join(mediaPath,type);

fs.readdir(folderPath,(err,files)=> {
    if(err){
        return res.status(500).json({error:"Error reading folder"});
       
    }
    const fileUrls = files.map(file => `/media/${type}/${file}`);
    res.json(fileUrls);
});
});


app.use("/media",express.static(mediaPath));

app.use(express.static("public"));
app.listen(3000,() => console.log("Server running at http://localhost:3000"));