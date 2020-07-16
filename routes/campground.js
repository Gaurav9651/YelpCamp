var express     = require("express");
var router      = express.Router();
var Campground  = require("../models/campground");
var middleware  = require("../middleware");
router.get("/campgrounds",function(req,res){
	Campground.find({},function(error,Allcampgrounds){
		if(error)
			{
				req.flash("error","Cannot Find Campground");
				res.redirect("/");
			}
		else{
			res.render("campground/index",{campgrounds:Allcampgrounds,currentUser:req.user});
		}
	})
});

router.post("/campgrounds",middleware.isloggedin,function(req,res)
{
	var name=req.body.name;
	var image=req.body.image;
	var price=req.body.price;
	var description=req.body.description;
	var author={
		id:req.user._id,
		username:req.user.username
	}
	var newcampground={name:name,price:price,
					   url:image,author:author,description:description};
	Campground.create(
		newcampground,
		function(err,campground)
			{
			   if(err)
				{
				   req.flash("error","Cannot Find Campground");
				   res.redirect("/");	
				}
				else
				{
					req.flash("success","Succesfully created a new Campground");
				}
			});
	res.redirect("/campgrounds");
});

router.get("/campgrounds/new",middleware.isloggedin,function(req,res){
	res.render("campground/new");
});

router.get("/campgrounds/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(error,foundcampground){
		if(error)
			{
				req.flash("error","Cannot Find Campground");
				 res.redirect("/");
			}
		else
			{
				res.render("campground/show",{foundcampground:foundcampground});
			}
	});
	
})

router.get("/campgrounds/:id/edit",middleware.isCampgroundAuthorised,function(req,res){
	Campground.findById(req.params.id,function(err,foundcampground){
		if(err){
			res.redirect("/campgrounds");
		}
		else
		{
		    res.render("campground/edit",{foundcampground:foundcampground});	
		}
	})
})

router.put("/campgrounds/:id",middleware.isCampgroundAuthorised,function(req,res){
	Campground.findOneAndUpdate({_id:req.params.id},req.body.campground,function(err,updatedCampground)
	{
		if(err)
			{
				res.redirect("/campground");
			}
		else
			{
				req.flash("success","Succesfully Edited Campground");
				res.redirect("/campgrounds/"+req.params.id );
			}
	})
})

router.delete("/campgrounds/:id",middleware.isCampgroundAuthorised,function(req,res){
   Campground.findOneAndRemove({_id:req.params.id},function(err)
	{
	   if(err)
		   {
			   res.redirect("/campgrounds");
		   }
	   else{
		   req.flash("success","Succesfully Deleted Campground");
		   res.redirect("/campgrounds");
	   }
   })
})


module.exports=router;