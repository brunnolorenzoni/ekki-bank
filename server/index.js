const express = require('express');
const cors = require('cors')
const app = express();

const models = require('./models');

//Improt Routes
const userRoute = require('./routes/userRoute');
const contactRoute = require('./routes/contactRoute');
const accountRoute = require('./routes/accountRoute');
const transactionRoute = require('./routes/transactionRoute');

//Middleware
app.use(express.json())
app.use(cors())

//Route Middleware
app.use('/api/', userRoute)
app.use('/api/', contactRoute)
app.use('/api/', accountRoute)
app.use('/api/', transactionRoute)


app.use('*', function(req,res){
    res.status(404).send("URL cannot found");        
})

models.sequelize.sync({}).then(() => {
    app.listen(3001);
});