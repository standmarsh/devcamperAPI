const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const errorHandler = require('./middleware/error');
const colors = require("colors");

//load env vars
dotenv.config({ path: "./config/config.env" });

//conect to database
connectDB();

//route files
const bootcamps = require("./routes/bootcamps");
const app = express();

// Body parser
app.use(express.json());

//dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//mount routers
app.use("/api/v1/bootcamps", bootcamps);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello from express");
});

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

//handle unhandled promise rejections

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);

  server.close(() => process.exit(1));
});
