
var express = require('express');
var cors =require('cors')
const cookieParser = require('cookie-parser');
const usersRouter=require("./routes/users")
const companyRouter=require("./routes/company")
var app = express();
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(cors());
app.use(cookieParser());
var Port=5000 




app.use("/individual",usersRouter)  
app.use("/company",companyRouter)

app.listen(Port,()=> console.log(`Server is listening to port ${Port}`))

module.exports = app;
