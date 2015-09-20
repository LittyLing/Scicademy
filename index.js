var http = require("http"),
		mongojs = require("mongojs"),
		express = require('express'),
		cors = require('cors'),
		fs = require("fs"),
  	path = require('path'),
		url = require("url"),
		FormData = require('form-data'),
		multer = require('multer'),
		bodyParser = require('body-parser'),
  	port = process.env.PORT || 8888,
  	ObjectID = require('mongodb').ObjectID;

app = express();
app.use(cors());
app.use(bodyParser.json());

var uri = "mongodb://Public:passpublic@ds036698.mongolab.com:36698/alirodatabase";
var db = mongojs(uri, ["Papers", "Users", "Posters"]);

app.post('/getUser', function(request, response) {
    var searchObj = {};
		//console.log("hello" + JSON.stringify(request));
    if(request.body.hasOwnProperty('searchType') && request.body.searchType == "id") {
			console.log("hey");
			searchObj = {"_id" : ObjectID(request.body.query)};
    }
    else {
    	searchObj = {
        "email": request.body.email,
        "password": request.body.password
    	}
    }
    var user = db.Users.findOne(searchObj, function(err, doc) {
        	if (err) {
            	response.send({error: 'error retrieving the JSON user' });
            	console.log('error recieving user');
        	}
        	else {
        			console.log("sent user to front end: " + JSON.stringify(doc));
							if(request.body.hasOwnProperty("meta")) {
								response.send({"doc": doc, "meta": request.body.meta});
							}
							else {
								response.send(doc);
							}
          }
    });
});

app.post('/getPaper', function(request, response) {
	console.log(request.body);
	if(request.body.searchType == "All") {
		var searchObject = {$or: [{$text: {$search: request.body.query}},
							   {keywords: request.body.query},
							   {authors: request.body.query}]};
	}
	else if(request.body.searchType == "Title") {
		var searchObject = {$text: {$search: request.body.query}};
	}
	else if(request.body.searchType == "Keywords") {
		var searchObject = {keywords: request.body.query};
	}
	else if(request.body.searchType == "Authors") {
		var searchObject = {authors: request.body.query};
	}
	else if(request.body.searchType == 'id') {
		var searchObject = {"_id" : ObjectID(request.body.query)};
	}
	db.Papers.find(searchObject, function(err, curs) {
		if(err) {
			console.log({error: "error finding paper!"});
			console.log(err);
		}
		else {
			response.send(curs);
		}
	});
});

app.post('/addUser', function(request, response) {
	console.log(request.body);
	db.Users.insert({email: request.body.eml,
					  password: request.body.pwd,
					  firstname: request.body.fnm,
					  lastname: request.body.lnm,
					  school: request.body.shl,
					  grade: request.body.grd,
					  publications: request.body.pub,
					  datejoined: request.body.dte}, function(err, record) {
		if(err) {
			console.log({error: 'error inserting new user'});
		}
		else {
			console.log("inserted new user");
			response.send(record);
		}
	});
});

app.post('/addPaper', function(request, response) {
	console.log(request.body);
	db.Papers.insert({title:request.body.title,
					  authors: request.body.authors,
					  abstract: request.body.abstract,
					  keywords: request.body.keywords,
					  pdf: request.body.pdf,
					  date: request.body.date}, function(err, record) {
		if(err) {
			console.log({error: 'error inserting new paper'});
		}
		else {
			console.log("inserted new paper");
			db.Papers.findOne({abstract: request.body.abstract}, function(err, doc) {
				if(err) {
					console.log("error finding self abstract in Papers");
				}
				else {
					console.log("found self")
					var authorsIdStrings = doc.authors,
						authorsOId = [];
					for(var i = 0; i < authorsIdStrings.length; i++) {
						authorsOId.push(ObjectID(authorsIdStrings[i]));
					}

					db.Users.update({_id: {$in: authorsOId}}, {$push: {publications: (""+doc._id)}}, {multi:true}, function(err, result) {
						if(err) {
							console.log("error updating authors");
						}
						else {
							console.log(JSON.stringify(doc.authors));
							console.log("added publication data to all authors: " + JSON.stringify(result));
						}
					});
				}
			});
			response.send(record);
		}
	});

});

app.post('/addPdf', [multer({dest: "./uploads/"}).single('avatar'), function(req, res) {
	console.log("file: " + req.file);
}]);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, function() {
	console.log('CORS-enabled Aliro web server listening on port ' + port);
});
