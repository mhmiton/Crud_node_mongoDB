const express 		= require('express');
const bodyParser 	= require('body-parser');
const MongoClient 	= require('mongodb').MongoClient;
const ObjectID 		= require('mongodb').ObjectID; 
const app 			= express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

//Start Server
app.listen(3000, function(){
	console.log('listening on 3000');
});

//MongoDB
var db
MongoClient.connect('mongodb://miton:mdmiton321@ds121730.mlab.com:21730/first_mongodb', (err, client) => {
	if(err) return console.log(err)
	db = client.db('first_mongodb')
});

// app.get('/', function(req, res) {
// 	res.send('Hello World');
// });

app.get('/', (req, res) => {
	//res.sendFile(__dirname+'/index.html');
	db.collection('user').find().sort({_id: -1}).toArray((err, results) => {
		if(err) return console.log(err)
		res.render('index.ejs', {users: results})
	});
});

app.post('/save', (req, res) => {

	var data = {
		name:req.body.name,
		email:req.body.email,
		phone:req.body.phone,
		usr_name:req.body.usr_name,
		password:req.body.password
	};

	if(req.body.id == '')
	{
		// For Save
		db.collection('user').save(data, (err, results) => {
			if (err) return console.log(err)
	   		res.redirect('/?type=Insert');
		});
	} else {
		// For Update
		db.collection('user').findOneAndUpdate(
			{ _id:ObjectID(req.body.id) }, 		// query
			{ $set:data }, 						// Set Update Data
			{ upsert: true }, 					// Options
			(err, results) => { 				// Call Back
			if (err) return console.log(err)
			res.redirect('/?type=Update')
		});
	}

});

app.delete('/delete', (req, res) => {
	db.collection('user').findOneAndDelete(
		{_id:ObjectID(req.body.id)},
		(err, results) => {
		if (err) return console.log(err)
		res.redirect('/')
	});
});
