var Campground=require("../models/campground");
var Comment=require("../models/comment");

var middleware={};

middleware.isCampgroundAuthorised=function(req,res,next)
{
	if(req.isAuthenticated())
		{
			Campground.findById(req.params.id,function(err,founduser){
				if(err)
					{
						req.flash("error","Server Error");
						res.redirect("back");
					}
				else{
					if(founduser.author.id.equals(req.user._id)){
					next();
					}
					else{
						req.flash("error","You do not have Permission to do that");
						res.redirect("back");
					}
				}
			})
		}
	else{
		req.flash("error","You Must be logged in to do that");
		res.redirect("back");
		}
}

middleware.isCommentAuthorised=function(req,res,next)
{
	if(req.isAuthenticated())
		{
			Comment.findById(req.params.comment_id,function(err,foundcomment)
			{
				if(err)
					{
						req.flash("error","Server Error");
						res.redirect("back");
					}
				else{
					    if(foundcomment.author.id.equals(req.user._id))
							{
								next();
							}
						else{
								req.flash("error","You do not have Permission to do that");
								res.redirect("back");
						}
				}
			})
		}
	else{
		req.flash("error","You Must be logged in to do that");
		res.redirect("back");
	}
}

middleware.isloggedin=function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","You Must be logged in to do that");
	res.redirect("/login");
}

module.exports=middleware;