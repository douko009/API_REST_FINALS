const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const exphbs = require('express-handlebars');
const app = express();
const bookList = require('./Books');



//init logger
//app.use(logger);

//handlebars middleware
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');

//homepage router
//app.get('/', (req, res) => res.render('index'));
app.get('/', function (req, res) {
    res.render('index', {
        title:'Donate Book App',
        bookList
    });
});


app.get('/allData', function (req, res) {
    res.render('allData', {
        title:'All Books Donated',
        bookList
    });
});


//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//set static folder
app.use(express.static(path.join(__dirname,'public',)));

//
app.use('/api/bookList', require('./routes/api/books'));

const PORT = process.env.PORT || 8000

app.listen(PORT, ()=> console.log(`Sever Started: ${PORT}`));