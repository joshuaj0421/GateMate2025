import express from "express";
import homeRouter from "./controllers/weatherController";
import exportRouter from "./utils/pdfExport";
import gateRouter from "./controllers/gateController";
import dotenv from "dotenv";
dotenv.config();
import session from "express-session";
import userRouter from "./controllers/userController";
import { connect } from "./datasources/db";
import fieldRouter from "./controllers/fieldController";
import trafficRouter from "./controllers/trafficController";
import './datasources/scheduler';

const PORT = 4001; // hardcoded ∵ hardcoded in client

const app = express();

//Connecting to the database once and reusing the connection
connect();

// Middleware goes here -- IF it does not go above routes it will not work ;)
app.use(
  session({
    secret: process.env.session_secret || "",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
  })
);
app.use(express.json());

app.use("/api/v1/home", homeRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/gate", gateRouter);
app.use("/api/v1/field", fieldRouter);
app.use("/api/v1/traffic", trafficRouter);
app.use('/api/v1/export', exportRouter);

// Start the server
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
