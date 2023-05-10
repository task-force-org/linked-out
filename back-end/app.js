
var express = require('express');
var cors =require('cors')

const usersRouter=require("./routes/users")
const companyRouter=require("./routes/company")


var app = express();
var Port=5000 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use("/individual",usersRouter)  
app.use("/company",companyRouter)

app.listen(Port,()=> console.log(`Server is listening to port ${Port}`))

module.exports = app;
