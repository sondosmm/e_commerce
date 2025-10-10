const express =require('express');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require('morgan');
const ApiError = require('./utils/apiError');

dotenv.config({path:'config.env'});

//connect with db
const dbConnection= require('./config/database');
const categoryRoute= require('./routes/categoryRoute');
const authRoutes = require("./routes/authRoutes");

dbConnection();

//express app
const app = express();
app.use(cors({ origin: "http://localhost:8000", credentials: true }));


app.use(express.json());
app.use(cookieParser());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke" });
});

app.use("/api/auth", authRoutes);

//middleware
app.use(express.json());
if (process.env.NODE_ENV ==='development') {
    app.use (morgan('dev'));
    console.log(`mode : ${process.env.NODE_ENV}`)
}

//routers
app.use('/api/v1/category',categoryRoute);

// app.all("*",(req,res,next)=>{
// //create error and send it to error handling middleware
// // const  err = new Error(`Can't find this route: ${req.originalUrl}`)
// // next(err.message)
// next(new ApiError("message",statusCode));
// });


// Handle not found routes (404)
app.use((req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find this route: ${req.originalUrl}`,
  });
});


// Handle not found routes (404)
app.use((req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find this route: ${req.originalUrl}`,
  });
});

//global error handling middleware
app.use((err,req,res,next)=>{
    res.status(400).json({err})
});



const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`App running ON PORT ${PORT}`);
});
