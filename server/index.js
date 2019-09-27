const express = require('express');
const app = express();

//Improt Routes
const userRoute = require('./routes/userRoute');
const contactRoute = require('./routes/contactRoute');
const accountRoute = require('./routes/accountRoute');
const operationRoute = require('./routes/operationRoute');


//Middleware
app.use(express.json())

//Route Middleware
app.use('/api/', userRoute)
app.use('/api/', contactRoute)
app.use('/api/', accountRoute)
app.use('/api/', operationRoute)


app.use('*', function(req,res){
    res.status(404).send("URL cannot found");        
})

app.listen(3001)