import express from 'express';
import cors from 'cors';
const app = express()
import path from 'path';
const __dirname = import.meta.dirname;
import { findCoordinateInTerritories } from './dist/src/turfFinder.js';

// Enable CORS
app.use(cors());

// Enable parsing of URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Enable parsing of JSON data
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post('/territories', async (req, res) => {
    console.log("HIT");
    try {
        const lng = Number(req.body.lng);
        const lat = Number(req.body.lat);
        res.json(findCoordinateInTerritories(lng, lat));
    }
    catch (e) {
        res.send(`Invalid Type + ${e}`)
    }
});

app.listen(3000, () => {
    console.log("Server started, listening on port 3000");
})


