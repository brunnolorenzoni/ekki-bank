const express = require('express');
const cors = require('cors')
const app = express();

const { sequelize } = require('./models');

const userRoute = require('./routes/userRoute');
const contactRoute = require('./routes/contactRoute');
const accountRoute = require('./routes/accountRoute');
const transactionRoute = require('./routes/transactionRoute');

app.use(express.json())
app.use(cors())

app.use('/api/', userRoute)
app.use('/api/', contactRoute)
app.use('/api/', accountRoute)
app.use('/api/', transactionRoute)


app.use('*', function(req,res){
    res.status(404).send("URL cannot found");        
})

sequelize.sync({force: false}).then(() => {
    app.listen(3001);
    console.log('running on port 3001');
});