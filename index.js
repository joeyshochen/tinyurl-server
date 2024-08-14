import express from "express";
import cors from "cors";
import db from "./config/db.js";
import { tinyUrlPort } from "./config.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World, from express');
})

app.post('/api/create-tinyurl', async (req, res) => {
        try {
                let collection = await db.collection('tinyurls');
                let document = req?.body;
                let result = await collection.insertOne(document);

                res.send([result, document]).status(204)

        } catch (error) {
                console.log(error.message);
        }
});

app.get('/api/getAllTinyUrls', async (_req, res) => {
        try {
                let collection = await db.collection('tinyurls');
                let result = await collection.find().toArray();

                if (!result) {
                        res.send("Not found").status(400);
                        return;
                }

                res.send(result).status(200);
        } catch (error) {
                console.log(error.message);
        }
});

app.get('/:id', async (req, res) => {
        try {
                let collection = await db.collection('tinyurls');
                let query = {alias: req.params.id};
                let result = await collection.findOne(query);

                if (!result?.srcUrl) {
                        res.send("Not found").status(404);
                }
                else {
                        res.redirect(result?.srcUrl);
                }
        } catch (error) {
                console.log("get error");
                console.log(error);
        }
});

app.put('/api/updateTinyUrl/:id', async (req, res) => {
        try {
                let collection = await db.collection('tinyurls');
                const body = req.body;
                console.log(body);

                if (!JSON.parse(body)){
                        throw "error parsing";
                }

                const filter = {"_id": req?.body?.id};

                let result = await collection.updateOne(filter, body);

                if (!result?.srcUrl) {
                        res.send("Not found").status(404);
                }
                else {
                        res.send(result).status(200);
                }
        } catch (error) {
                console.log("update error");
                console.log(error.message);
        }
});

app.get('/api/getTinyUrl/:id', async (req, res) => {

        if (req?.params?.id) {
                try {
                        let collection = await db.collection('tinyurls');
                        let query = {alias: req?.params?.id};
                        let result = await collection.findOne(query);
        
                        if (!result) {
                                res.send("Not found").status(404);
                        }
                        else {
                                res.send(result).status(200);
                        }
                } catch (error) {
                        console.log(error.message);
                }
        }

});



app.listen(tinyUrlPort, () => {
        console.log("TinyUrl is listening on port " + tinyUrlPort);
});
