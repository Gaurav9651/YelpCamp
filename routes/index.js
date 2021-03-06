var express=require("express");
var router=express.Router();
var passport=require("passport");
var User=require("../models/user");

router.get("/",function(req,res)
{
  res.render("landing");
})
router.get("/register",function(req,res){
	res.render("authenticate/register");
})
router.post("/register",function(req,res){
  User.register(new User({username:req.body.username}),req.body.password,function(err,user)
	{
	 if(err)
	 {
		 req.flash("error","DataBase error");
		 res.redirect("authenticate/register")
	 } 
	 else{
			passport.authenticate("local")(req,res,function(){
			res.redirect('/campgrounds');
		})	  
	  }
  })
})
router.get("/login",function(req,res){
	res.render("authenticate/login");
})

router.post('/login',
  passport.authenticate('local', { successRedirect: '/campgrounds',
                                   failureRedirect: '/login' }),function(req,res){
	
})  
router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","Sucessfully Logged Out");
	res.redirect("/campgrounds");
})

module.exports=router;