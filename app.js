var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var con = require('./models/user');

// invoke an instance of express application.
var app = express();

// set our application port
app.set('port', 9000);

// set morgan to log info about our requests for development use.
app.use(morgan('dev'));
app.set("view engine","ejs");

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));


// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});


// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        next();
    }    
};

//isAuthenticated
app.get('/isAuthenticated', (req,res)=>{
    if(req.session.user && req.cookies.user_sid){
        res.send(JSON.stringify({'User':req.session.user}));
    }
    else{
        res.send(JSON.stringify({'User':null}));
    }
});

// route for Home-Page
app.get('/', sessionChecker, (req, res) => {
    res.redirect('/login');
});
// route for user Login
app.route('/login')
    .get(sessionChecker, (req, res) => {
        res.render('login')
    })
    .post((req, res) => {
        var username = req.body.username,
            password = req.body.password;

        con.query(`select * from newuser where userid= "${username}"`,function(err,result){
        	if(err){
        		res.send("Some Error");
        	}

        	// console.log(result[0].userid);
        	if(result.length == 0){
        		res.send('User Not Found')
        	}
        	else if(result[0].password != password)
        		res.send('Password Not matching');
        	else{
        		req.session.user = result[0].userid;
        		res.send('passuser');
        	}
        })
    })


// route for user's dashboard
app.get('/dashboard', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.render('index');
    } else {
        res.redirect('/login');
    }
});


// route for user logout
app.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});

//route for create university details

app.post('/create', (req,res)=>{
	if(req.session.user && req.cookies.user_sid){

		const userid = req.session.user;
		const uniname = req.body.uniname;
		const weburl = req.body.weburl;
		const contact = req.body.contact;
		const regdate = req.body.regdate;
		const expdate = req.body.expdate;
		const imgurl = req.body.imgurl;
		const numstud = req.body.numstud;
		const email = req.body.email;

		var createQuery = `insert into unidetail (userid,uniname,weburl,contact,regdate,expdate,imgurl,numstud,email) VALUES ("${userid}","${uniname}","${weburl}",${contact},"${regdate}","${expdate}","${imgurl}",${numstud},"${email}")`;
		
		con.query(createQuery,(err,result)=>{
			if(err){
				console.log(err);
				res.send('We face some backend errors');
			}
			else
				res.send("Inserted into table");
		});

	}else{
		res.redirect('/login');
	}

}); 

//route for viewing uni-details

app.get('/showdetail',(req,res)=>{
	if(req.session.user && req.cookies.user_sid){
		con.query(`select * from unidetail where userid = "${req.session.user}"`,(err,result)=>{
			if(err){
				console.log(err);
				res.send("Problem in retrieving data");
			}
			res.send(result);
		});
		
	}
	else{
		res.redirect('/login');
	}
});


// route for handling 404 requests(unavailable routes)
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
});


// start the express server
app.listen(app.get('port'), () => console.log(`App started on port ${app.get('port')}`))