
var express = require('express');
var cors =require('cors')
const cookieParser = require('cookie-parser');
const usersRouter=require("./routes/users")
const companyRouter=require("./routes/company")
const userAplly=require("./routes/appliedUsers")
const postC=require("./routes/postCompanies")
const appell=require("./routes/application")
const usersPostsRouter=require('./routes/postUsers')
var app = express();
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(cors());
app.use(cookieParser());
var Port=5000 



app.use("/app",appell) //this to see the appliers of a post
app.use("/individual",usersRouter)  
app.use("/user",userAplly)  
app.use("/company",companyRouter)
app.use("/company/post",postC)
app.use("/individual/posts",usersPostsRouter)
app.listen(Port,()=> console.log(`Server is listening to port ${Port}`))

module.exports = app;
