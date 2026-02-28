//<import>
import express from 'express'
import cors from 'cors'
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
//</import>
//<variables>
const app = express()
const port = 5000;
//</variables>

//<middleware>
app.use(express.json());
app.use(cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

//</middleware>

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`DB at port: ${conn.connection.host}`)
    } catch(err){
        console.log(err);
    }
}

//<schema>
const houseSchema = new mongoose.Schema({
    name: String,
    points: Number,
},

{timestamps: true}
)

const commitSchema = new mongoose.Schema({
    name: String,
    reason: String,
    points: Number,
    teacher: String
},

{timestamps: true}
)
//</schema>
const House= mongoose.model("House", houseSchema);

const Titan_House_Commits = mongoose.model("Titan_House_Commits", commitSchema);
const Phoenix_House_Commits = mongoose.model("Phoenix_House_Commits", commitSchema);
const Unicorn_House_Commits = mongoose.model("Unicorn_House_Commits", commitSchema);
const Trojan_House_Commits = mongoose.model("Trojan_House_Commits", commitSchema);

app.get('/api/housepoints', async (req, res) => {
    try {
        const house = await House.find();
        res.status(200).json({success: true, data: house})
    }
    catch(err){
        console.log(err)
        res.status(500).json({success: false, message: "server error"})
    }
})

app.get('/api/titan_commit', async (req, res) => {
    try {
        const commit = await Titan_House_Commits.find().sort({createdAt: -1});
        res.status(200).json({success: true, data: commit})
    }
    catch(err){
        console.log(err)
        res.status(500).json({success: false, message: "server error"})
    }
})
app.get('/api/phoenix_commit', async (req, res) => {
    try {
        const commit = await Phoenix_House_Commits.find().sort({createdAt: -1});
        res.status(200).json({success: true, data: commit})
    }
    catch(err){
        console.log(err)
        res.status(500).json({success: false, message: "server error"})
    }
})
app.get('/api/unicorn_commit', async (req, res) => {
    try {
        const commit = await Unicorn_House_Commits.find().sort({createdAt: -1});
        res.status(200).json({success: true, data: commit})
    }
    catch(err){
        console.log(err)
        res.status(500).json({success: false, message: "server error"})
    }
})
app.get('/api/trojan_commit', async (req, res) => {
    try {
        const commit = await Trojan_House_Commits.find().sort({createdAt: -1});
        res.status(200).json({success: true, data: commit})
    }
    catch(err){
        console.log(err)
        res.status(500).json({success: false, message: "server error"})
    }
})

// ---------------------- POST: Add a commit to Titan ----------------------
app.post("/api/titan_commit", async (req, res) => {
    try {
        const { name, reason, points, teacher } = req.body;

        if (!name || !reason || points === undefined || !teacher) {
            return res.status(400).json({
                success: false,
                message: "All fields required"
            });
        }

        const commit = new Titan_House_Commits({
            name,
            reason,
            points,
            teacher
        });

        await commit.save();

        await House.findOneAndUpdate(
            { name: "titan" },
            { $inc: { points: points } }
        );

        res.status(201).json({ success: true, message: "Commit added" });

    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});


// ---------------------- POST: Phoenix ----------------------
app.post("/api/phoenix_commit", async (req, res) => {
    try {
        const { name, reason, points, teacher } = req.body;

        if (!name || !reason || points === undefined || !teacher) {
            return res.status(400).json({ success: false, message: "All fields required" });
        }

        const commit = new Phoenix_House_Commits({ name, reason, points, teacher });
        await commit.save();

        await House.findOneAndUpdate(
            { name: "phoenix" },
            { $inc: { points: points } }
        );

        res.status(201).json({ success: true, message: "Commit added" });

    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});


// ---------------------- POST: Unicorn ----------------------
app.post("/api/unicorn_commit", async (req, res) => {
    try {
        const { name, reason, points, teacher } = req.body;

        if (!name || !reason || points === undefined || !teacher) {
            return res.status(400).json({ success: false, message: "All fields required" });
        }

        const commit = new Unicorn_House_Commits({ name, reason, points, teacher });
        await commit.save();

        await House.findOneAndUpdate(
            { name: "unicorn" },
            { $inc: { points: points } }
        );

        res.status(201).json({ success: true, message: "Commit added" });

    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});


// ---------------------- POST: Trojan ----------------------
app.post("/api/trojan_commit", async (req, res) => {
    try {
        const { name, reason, points, teacher } = req.body;

        if (!name || !reason || points === undefined || !teacher) {
            return res.status(400).json({ success: false, message: "All fields required" });
        }

        const commit = new Trojan_House_Commits({ name, reason, points, teacher });
        await commit.save();

        await House.findOneAndUpdate(
            { name: "trojan" },
            { $inc: { points: points } }
        );

        res.status(201).json({ success: true, message: "Commit added" });

    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Connected to PORT: ${port}`);
    })
})