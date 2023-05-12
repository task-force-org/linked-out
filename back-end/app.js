
var express = require('express');
var cors =require('cors')
const cookieParser = require('cookie-parser');
const usersRouter=require("./routes/users")
const companyRouter=require("./routes/company")
const companiesPostsRouter=require("./routes/postCompanies")
const userAplly=require("./routes/appliedUsers")

var app = express();
var Port=5000 

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(cors())
app.use(cookieParser());

app.use("/individual",usersRouter)  
app.use("/user",userAplly)  
app.use("/company",companyRouter)
app.use("/posts/companies",companiesPostsRouter)
app.listen(Port,()=> console.log(`Server is listening to port ${Port}`))

module.exports = app;
