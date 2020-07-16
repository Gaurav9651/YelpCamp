var mongoose    = require("mongoose");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment");

var data=[
	{
		name:"Campground 1",
		url:"https://pixabay.com/get/57e6d7454e53ae14f1dc84609620367d1c3ed9e04e507440712a79dc9344c7_340.jpg",
		description:"Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book."
	},
	{
		name:"Campground 2",
		url:"https://pixabay.com/get/55e9d045495bab14f1dc84609620367d1c3ed9e04e507440712a79dd954ac3_340.jpg",
		description:"Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book."
	},
	{
		name:"Campground 3",
		url:"https://pixabay.com/get/57e6d24b4d53a814f1dc84609620367d1c3ed9e04e507440712a79dd9448c0_340.jpg",
		description:"Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book."
	}
]

function seedDB()
{
	// remove campgrounds 
Campground.remove({},function(err)
{
	if(err)
		{
			console.log(err);
		}
	else
		{
			console.log("removed all campground");
			// Comment.remove({},function(err){
			// 	if(err)
			// 		{
			// 			console.log(err);
			// 		}
			// 	else{
			// 		//adding cmpgrounds
			// 		data.forEach(function(seed)
			// 		   {
			// 			  Campground.create(seed,function(err,campground){
			// if(err)
			// 					{
			// 						console.log(err);
			// 					}
			// 				  else{
			// 					  console.log("added a campground");
			// 					  Comment.create({title:"fuck comment",author:"Gaurav Arora"},function(err,comment)                                     {
			// 						  if(err)
			// 							  {
			// 								  console.log(err);
			// 							  }
			// 						  else{
			// 							  console.log("created a comment");
			// 							  campground.comments.push(comment);
			// 							  campground.save(function(err)
			// 							  {
			// 								if(err)
			// 									{
			// 										console.log(err);
			// 									}
			// 								  else{
			// 									  console.log("added comment in campground");
			// 								  }
			// 							  })
			// 						  }
			// 					  })
			// 				  }
			// 			  })

			// 			})
			// 	   }
				
			// })
		}	
	
})
}
 module.exports=seedDB;

// remove comments
//add new campground
//add new comment