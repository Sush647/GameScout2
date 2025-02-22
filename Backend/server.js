const express = require("express");
const cors = require("cors");



const app = express();
const PORT =process.env.PORT || 5000;
// const API_KEY = process.env.API_KEY;
const BASE_URL = "https://www.giantbomb.com/api";
const API_KEY=process.env.API_KEY;

console.log(process.env.API_KEY)
// Enable CORS
app.use(cors());
app.use(express.json());

// Proxy route to fetch game data
app.get("/games", async (req, res) => {
    try {
        const offset = req.query.offset || 0;
        const url = `${BASE_URL}/games/?api_key=${API_KEY}&format=json&limit=24&filter=expected_release_year:2019-2024&offset=${offset}`;
        const response = await fetch(url); 
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data", details: error.message });
    }
});

app.get("/game/:gameid",async(req,res)=>{
    try{
        const gameid=req.params.gameid;
        const url=`${BASE_URL}/game/${gameid}/?api_key=${API_KEY}&format=json`;
        const response=await fetch(url);
        const data=await response.json();
        res.json(data);
    }catch (error) {
        res.status(500).json({ error: "Failed to fetch data", details: error.message });
    }
});

app.get("/search/:gamename",async(req,res)=>{
    try{
        const gamename=req.params.gamename;
        const url=`${BASE_URL}/search/?api_key=${API_KEY}&format=json&query=${gamename}&resources=game`
        const response=await fetch(url);
        const data=await response.json();
        res.json(data);
    }catch(error){
        res.status(500).json({ error: "Failed to fetch data", details: error.message });
    }
});






app.listen(PORT, () => {
    console.log(`Proxy server running at http://localhost:${PORT}`);
});
