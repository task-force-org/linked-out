
var express = require('express');
var cors =require('cors')

const usersRouter=require("./routes/users")
const companyRouter=require("./routes/company")
const companiesPostsRouter=require("./routes/postCompanies")
const usersPostsRouter=require("./routes/postUsers")

var app = express();
var Port=5000 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use("/individual/posts",usersPostsRouter)  
app.use("/individual",usersRouter)  
app.use("/company",companyRouter)
app.use("/posts/companies",companiesPostsRouter)
app.listen(Port,()=> console.log(`Server is listening to port ${Port}`))

module.exports = app;
