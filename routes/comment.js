var express    = require("express");
var router     = express.Router();
var Campground = require("../models/campground");
var Comment    = require("../models/comment");
var middleware  = require("../middleware");

// router.get("/campgrounds/:id/comments/new",middleware.isloggedin,function(req,res)
// {
//     Campground.findById(req.params.id,function(err,campground){
// 		if(err)
// 			{
// 				req.flash("error","Cannot Find such comment");
// 				res.redirect("/campgrounds");
// 			}
// 		else
// 			{
//                 res.render("comment/new",{campground:campground});
// 			}
// 	})
// })

router.post("/campgrounds/:id/comments",middleware.isloggedin,function(req,res){
	Campground.findById(req.params.id,function(err,campground){
	   Comment.create(req.body.comment,function(err,comment){
		   if(err){
			   console.log(err);
		   }
		   else{
			   comment.author.id=req.user._id;
			   comment.author.username=req.user.username;
			   comment.save();
			   campground.comments.push(comment);
			   campground.save();
			   req.flash("success","Succesfully Added Comment ");
			   res.redirect("/campgrounds/"+req.params.id);
		   }
	   })				
	})
});
router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.isCommentAuthorised,function(req,res){
	Comment.findById(req.params.comment_id,function(err,foundcomment){
		if(err)
			{
				res.redirect("/");
			}
		else
			{
				res.render("comment/edit",{comment:foundcomment,campgroundid:req.params.id});
			}
	})
})

router.put("/campgrounds/:id/comments/:comment_id",middleware.isCommentAuthorised,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.editedcomment,function(err,foundcomment){
		if(err){
		    req.flash("error","Failed to update Comment");
			res.redirect("/campgrounds/"+req.params.id);
		}
		else{
			res.redirect("/campgrounds/"+req.params.id)
		}
	})
})

router.delete("/campgrounds/:id/comments/:comment_id",middleware.isCommentAuthorised,function(req,res){
	Comment.findByIdAndDelete(req.params.comment_id,function(err){
		if(err)
			{
				 req.flash("error","Failed to delete Comment");
				res.redirect("/campgrounds/"+req.params.id);
			}
		else{
			 req.flash("success","Succesfully Deleted Comment");
			res.redirect("/campgrounds/"+req.params.id);
		}
	})
})


module.exports=router;

