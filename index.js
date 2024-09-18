const express = require('express')

const path = require('path')

const fs = require('fs');

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const departments = JSON.parse(fs.readFileSync(path.join(__dirname, '/data/departments.json')));

const towns = JSON.parse(fs.readFileSync(path.join(__dirname, '/data/towns.json')));

app.get('/departments', (req, res) => {
    res.json(departments);
});


app.get('/towns/:departmentCode', (req, res) => {
    const departmentCode = req.params.departmentCode;
    const filteredTowns = towns.filter(town => town.department === departmentCode);
    res.json(filteredTowns);
});



//setters
app.use(express.static(path.join(__dirname,'public')))

app.set('PORT',process.env.PORT || 3000 )
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

//middleware
app.use(express.json())
app.use(express.urlencoded({extends:true}))
app.use('/',require('./routes/index'))

app.listen(app.get('PORT'),()=>console.log(`Server ready at Port ${app.get('PORT')}`))