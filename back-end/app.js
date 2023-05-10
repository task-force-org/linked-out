
var express = require('express');
var cors =require('cors')

const usersRouter=require("./routes/users") //require the route from users.js in the router folder
const companiesPostsRouter=require("./routes/postCompanies")


var app = express();
var Port=5000 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use("/users",usersRouter)  //and using it here
app.use("/posts/companies",companiesPostsRouter)

app.listen(Port,()=> console.log(`Server is listening to port ${Port}`))

module.exports = app;
