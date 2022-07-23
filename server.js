app.set('views', path.join(__dirname, 'views'));

app.use(myParser.vjson());// parse application/json
var dbi;



app.get('/home', function (req, res) {
    res.render('pages/home');
});