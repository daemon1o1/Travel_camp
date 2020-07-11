var express=require("express");
var router=express.Router();
// var router=express.Router({mergeParams:true});
var Campground=require("../models/campground");
var Comment=require("../models/comment");

//comments new
router.get("/campgrounds/:id/comments/new",isLoggedIn, function(req,res) {
    //find campground by id
    Campground.findById(req.params.id,function(err,campground) {
        if(err)
        {
            console.log(err);      
        }
        else{console.log("campground"); 
          res.render("comments/new",{campground:campground});
        } 
    });
  });
//comments post 
  router.post("/campgrounds/:id/comments",isLoggedIn, function (req,res) {
      //lookup campground using id
      Campground.findById(req.params.id,function (err,campground){
          if(err){
              console.log(err);
              res.redirect("/campgrounds");
          }
          else{
              Comment.create(req.body.comment,function (err,comment) {
                  if(err){
                      console.log(err);
                      
                  }
                  else{console.log(comment+"hi");
                  //adding usernmae and id in comment and push baadme
                 comment.author.id =req.user._id;
                  comment.author.username =req.user.username;
                  comment.save();
                      campground.comments.push(comment);//jo function se pass hua 98 ln
                      campground.save();
                      res.redirect("/campgrounds/"+campground._id);
                  }
                  
              });
          }
          
      });
      
  });
//middleware
  function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

 module.exports =router;
