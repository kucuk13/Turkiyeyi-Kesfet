var express = require('express');
var app = express();
app.set('view engine', 'ejs');
var routes = require('./routes');
var path = require('path');
app.use(express.static(__dirname + '/public'));
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/"
var bodyParser = require('body-parser');
app.use(bodyParser());

app.get('/', routes.home);
app.post('/login', routes.login);
app.post('/signup', routes.signup);
app.get('/edit', routes.edit);
app.post('/add', routes.add);
app.get('/:user?/:id?/posts', routes.posts);
app.get('/:user?/:id?/about', routes.about);
app.get('/:user?/:id?/followers', routes.followers);
app.get('/:user?/:id?/following', routes.following);
app.get('/:user?/:id?/likes', routes.likes);
app.post('/:user?/:id?/new_comment', routes.new_comment);
app.post('/:user?/:id?/follow', routes.follow);
app.post('/:user?/:id?/like', routes.like);
app.post('/:user?/:id?/new_answer', routes.new_answer);
app.post('/:user?/new_answer_page', routes.new_answer_page);
app.post('/:id?/update', routes.update);
app.post('/:user?/:which?/post_like', routes.post_like);
app.get('/:user?/settings', routes.settings);
app.get('/:user?/search', routes.search);
app.get('/:user?/page', routes.page);
app.get('/:user?/:id?/comments', routes.comments);
app.get('/:user?/:id?/information', routes.information);
app.get('/:user?/:id?/photos', routes.photos);
app.get('/:user?/:id?/videos', routes.videos);
app.get('/:user?/:id?/fans', routes.fans);
app.get('*', routes.notFound);

app.listen(3000, function() {
	console.log("Çalıştı.");
});