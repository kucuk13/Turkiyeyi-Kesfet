var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

exports.home = function(req, res){
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("projeDB");
		dbo.collection("users").find({}).toArray(function(err, result) {
			if (err) throw err;
			res.render('home', {
				title: "e-KAMPUS",
				users: result
			});
			db.close();
		});
	});
};

exports.login = function(req, res){
	var mail = req.body.mail;
	var psw = req.body.psw;
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("projeDB");
		dbo.collection("users").find( { mail: mail, psw: psw  } ).count(function (e, count) {
			if (err) throw err;
			if (count == 1){
				dbo.collection("users").find({mail: mail, psw: psw}, { projection: { id: 1 }}).toArray(function(err, result) {
					if (err) throw err;
					res.redirect("/" + result[0].id + "/page");
			});
			db.close();
			};
		});
	});
};

exports.signup = function(req, res){
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("projeDB");
		dbo.collection("users").insertOne(req.body, function(err, res) {
			if (err) throw err;
			db.close();
		});
	});
	res.redirect("/");
};

exports.edit = function(req, res){
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("projeDB");
		dbo.collection("places").find({}).toArray(function(err, result) {
			if (err) throw err;
			res.render('edit', {
				title: "e-KAMPUS",
				places: result
			});
			db.close();
		});
	});
};

exports.add = function(req, res){
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("projeDB");
		dbo.collection("places").insertOne(req.body, function(err, res) {
			if (err) throw err;
			db.close();
		});
	});
	res.redirect("/");
};

exports.posts =  function(req, res){
	var id = req.params.id;
	var user = req.params.user;
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("projeDB");
		dbo.collection("users").find({}).toArray(function(err, result) {
			dbo.collection("posts").find({}).toArray(function(err, result2) {
				dbo.collection("places").find({}).toArray(function(err, result3) {
					res.render('posts', {
						title: "e-KAMPUS",
						users: result,
						posts: result2,
						places: result3,
						user: user,
						id: id
					});
					db.close();
				});
			});
		});
	});
};

exports.about =  function(req, res){
	var id = req.params.id;
	var user = req.params.user;
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("projeDB");
		dbo.collection("users").find({}).toArray(function(err, result) {
			if (err) throw err;
			res.render('about', {
				title: "e-KAMPUS",
				users: result,
				user: user,
				id: id
			});
			db.close();
		});
	});
};

exports.followers =  function(req, res){
	var id = req.params.id;
	var user = req.params.user;
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("projeDB");
		dbo.collection("users").find({}).toArray(function(err, result) {
			if (err) throw err;
			dbo.collection("followers").find({}).toArray(function(err, result2) {
				if (err) throw err;
				res.render('followers', {
					title: "e-KAMPUS",
					users: result,
					followers: result2,
					user: user,
					id: id
				});
				db.close();
			});
		});
	});
};

exports.following =  function(req, res){
	var id = req.params.id;
	var user = req.params.user;
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("projeDB");
		dbo.collection("users").find({}).toArray(function(err, result) {
			if (err) throw err;
			dbo.collection("followers").find({}).toArray(function(err, result2) {
				if (err) throw err;
				res.render('following', {
					title: "e-KAMPUS",
					users: result,
					followers: result2,
					user: user,
					id: id
				});
				db.close();
			});
		});
	});
};

exports.likes =  function(req, res){
	var id = req.params.id;
	var user = req.params.user;
	MongoClient.connect(url, function(err, db) {
		var dbo = db.db("projeDB");
		dbo.collection("users").find({}).toArray(function(err, result) {
			dbo.collection("places").find({}).toArray(function(err, result2) {
				dbo.collection("fans").find({}).toArray(function(err, result3) {
					res.render('likes', {
						title: "e-KAMPUS",
						users: result,
						places: result2,
						fans: result3,
						user: user,
						id: id
					});
				db.close();
				});
			});
		});
	});
};

exports.new_comment = function(req, res){
	var user = req.params.user;
	var id = req.params.id;
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("projeDB");
		dbo.collection("posts").insertOne(req.body, function(err, res) {
			if (err) throw err;
			db.close();
		});
	});
	res.redirect("/" + user + "/" + id + "/comments");
};

exports.follow = function(req, res){
	var user = req.params.user;
	var id = req.params.id;
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("projeDB");
		dbo.collection("followers").find( { id: user, follow_id: id  } ).count(function (e, count) {
			if (count == 0 && user != id){
				dbo.collection("followers").insertOne(req.body, function(err, res) {
					if (err) throw err;
					db.close();
				});
			};
		});
	});
	res.redirect("/" + user + "/" + user + "/following");
};

exports.like = function(req, res){
	var user = req.params.user;
	var id = req.params.id;
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("projeDB");
		dbo.collection("fans").find( { user: user, place: id  } ).count(function (e, count) {
			if (count == 0){
				dbo.collection("fans").insertOne(req.body, function(err, res) {
					if (err) throw err;
					db.close();
				});
			};
		});
	});
	res.redirect("/" + user + "/" + id + "/fans");
};

exports.new_answer = function(req, res){
	var user = req.params.user;
	var id = req.params.id;
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("projeDB");
		dbo.collection("posts").insertOne(req.body, function(err, res) {
			if (err) throw err;
			db.close();
		});
	});
	res.redirect("/" + user + "/" + id + "/posts");
};

exports.new_answer_page = function(req, res){
	var user = req.params.user;
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("projeDB");
		dbo.collection("posts").insertOne(req.body, function(err, res) {
			if (err) throw err;
			db.close();
		});
	});
	res.redirect("/" + user + "/page");
};

exports.update = function(req, res){
	var id = req.params.id;
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("projeDB");
		dbo.collection("users").updateOne({id:req.body.id}, {$set: {name:req.body.name, surname:req.body.surname, city:req.body.city, country:req.body.country, mail:req.body.mail, gender:req.body.gender, birth:req.body.birth}}, function(err, res) {
			if (err) throw err;
			db.close();
		});
	});
	res.redirect("/" + id + "/" + id + "/about");
};

exports.post_like = function(req, res){
	var user = req.params.user;
	var which = req.params.which;
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("projeDB");
		dbo.collection("posts").find( { which: which, id: user, type:"like"  } ).count(function (e, count) {
			if (count == 0){
				dbo.collection("posts").insertOne(req.body, function(err, res) {
					if (err) throw err;
					db.close();
				});
			};
		});
	});
	res.redirect("/" + user + "/" + user + "/posts");
};

exports.search = function(req, res){
	var user = req.params.user;
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("projeDB");
		dbo.collection("users").find({}).toArray(function(err, result) {
			if (err) throw err;
			dbo.collection("places").find({}).toArray(function(err, result2) {
				if (err) throw err;
				res.render('search', {
					title: "e-KAMPUS",
					users: result,
					places: result2,
					user: user
				});
				db.close();
			});
		});
	});
};

exports.page =  function(req, res){
	var id = req.params.id;
	var user = req.params.user;
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("projeDB");
		dbo.collection("users").find({}).toArray(function(err, result) {
			dbo.collection("posts").find({}).toArray(function(err, result2) {
				dbo.collection("places").find({}).toArray(function(err, result3) {
					dbo.collection("followers").find({}).toArray(function(err, result4) {
						res.render('page', {
							title: "e-KAMPUS",
							users: result,
							posts: result2,
							places: result3,
							followers: result4,
							user: user,
							id: id
						});
					});
						db.close();
				});
			});
		});
	});
};

exports.settings =  function(req, res){
	var user = req.params.user;
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("projeDB");
		dbo.collection("users").find({}).toArray(function(err, result) {
			if (err) throw err;
			res.render('settings', {
				title: "e-KAMPUS",
				users: result,
				user: user
			});
			db.close();
		});
	});
};

exports.comments =  function(req, res){
	var id = req.params.id;
	var user = req.params.user;
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("projeDB");
		dbo.collection("users").find({}).toArray(function(err, result) {
			dbo.collection("posts").find({}).toArray(function(err, result2) {
				dbo.collection("places").find({}).toArray(function(err, result3) {
						res.render('comments', {
							title: "e-KAMPUS",
							users: result,
							posts: result2,
							places: result3,
							user: user,
							id: id
						});
						db.close();
				});
			});
		});
	});
};

exports.information =  function(req, res){
	var id = req.params.id;
	var user = req.params.user;
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("projeDB");
		dbo.collection("users").find({}).toArray(function(err, result) {
			if (err) throw err;
			dbo.collection("places").find({}).toArray(function(err, result2) {
				res.render('information', {
					title: "e-KAMPUS",
					users: result,
					places: result2,
					id: id,
					user: user
				});
				db.close();
			});
		});
	});
};

exports.photos =  function(req, res){
	var id = req.params.id;
	var user = req.params.user;
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("projeDB");
		dbo.collection("users").find({}).toArray(function(err, result) {
			dbo.collection("places").find({}).toArray(function(err, result2) {
				dbo.collection("posts").find({}).toArray(function(err, result3) {
					res.render('photos', {
						title: "e-KAMPUS",
						users: result,
						places: result2,
						posts: result3,
						id: id,
						user: user
					});
					db.close();
				});
			});
		});
	});
};

exports.videos =  function(req, res){
	var id = req.params.id;
	var user = req.params.user;
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("projeDB");
		dbo.collection("users").find({}).toArray(function(err, result) {
			dbo.collection("places").find({}).toArray(function(err, result2) {
				dbo.collection("posts").find({}).toArray(function(err, result3) {
					res.render('videos', {
						title: "e-KAMPUS",
						users: result,
						places: result2,
						posts: result3,
						id: id,
						user: user
					});
					db.close();
				});
			});
		});
	});
};

exports.fans =  function(req, res){
	var id = req.params.id;
	var user = req.params.user;
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("projeDB");
		dbo.collection("users").find({}).toArray(function(err, result) {
			dbo.collection("places").find({}).toArray(function(err, result2) {
				dbo.collection("fans").find({}).toArray(function(err, result3) {
					res.render('fans', {
						title: "e-KAMPUS",
						users: result,
						places: result2,
						fans: result3,
						id: id,
						user: user
					});
					db.close();
				});
			});
		});
	});
};

exports.notFound =  function(req, res){
	res.send("Böyle bir sayfa yok.");
};