var express               = require("express");
var mongoose              = require("mongoose");
var passport              = require("passport");
var session               = require("express-session");
var parser                = require("body-parser");
var LocalStrategy         = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var Comment               = require("./models/comment");
var Campground            = require("./models/campground");
var User                  = require("./models/user");
var seedDB                = require("./seeds");
var commentRoutes         = require("./routes/comment");
var campgroundRoutes      = require("./routes/campground");
var indexRoutes           = require("./routes/index");
var methodOverride        = require("method-override");
var flash                 = require("connect-flash");
var app= express();
// mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser:true, useUnifiedTopology: true});
mongoose.connect(process.env.DATABASEURL,{ useNewUrlParser: true, useUnifiedTopology: true});
app.use(session({
  secret: 'rusty is the cutest dog in this world',
  resave: false,
  saveUninitialized: false
}))

// seedDB();

app.set("view engine","ejs");
app.use(flash());
passport.use(new LocalStrategy(User.authenticate()));
app.use(methodOverride('_method'));
app.use(passport.initialize());
app.use(passport.session());
app.use(parser.urlencoded({extended:true}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(express.static(__dirname+"/public"));
app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	res.locals.error=req.flash("error");
	res.locals.success=req.flash("success");
	next();
})
app.use(commentRoutes);
app.use(campgroundRoutes);
app.use(indexRoutes);



app.listen(3000,function()
{
 console.log("Starting Yelp Camp Server");	
})