import express from "express";
import router from "./routes/api";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use("/api", router);




app.listen(3000, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

