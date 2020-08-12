var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
router.get("/campgrounds",function (req,res){
    
    Campground.find({},function (err,allcampgrounds){
       if(err) {
           console.log(err);
           
       }
       else{
           res.render("campgrounds/index",{campgrounds:allcampgrounds,currentUser: req.user});
       }
    });
 });
 
 router.get("/campgrounds/new",isLoggedIn,function (req,res) {
     //show the form that send data
     res.render("campgrounds/new");
 });
 
 router.get("/campgrounds/:id",function (req,res) {
     Campground.findById(req.params.id).populate("comments").exec(function (err,foundCampgrounds) {
         if(err){
             console.log(err);
             
         }
         else{
         
             res.render("campgrounds/show",{campground: foundCampgrounds});
         }
     });
    
 });
 
 router.post("/campgrounds",isLoggedIn,function (req,res) {
     var name=req.body.name;
     var image=req.body.image;
     var desc=req.body.desc;
     console.log(image);
     var author={
        id:req.user_id,
        username:req.user.username
    }
     var newcampground={name:name,image:image,description:desc,author:author};
     // create new capmgriund and save to  db
    

     Campground.create(newcampground,function (err,newlyCreated) {
         if(err)
         {console.log(err);
         }else{console.log("post working");

             res.redirect("/campgrounds");
         }
         
     });
     //get data from form and add to comapground Array
     //redirect to camp ground
 });
//EDIT CAMPGROUND
router.get("/campgrounds/:id/edit",function (req,res) {
    Campground.findById(req.params.id,function(err,foundCampground) {
        if(err)
        {
            console.log(err);
            res.redirect("/campgrounds")
        }
        else{
            res.render("campgrounds/edit",{campground: foundCampground});
        }

        
    })
    
})
//UPDATE CAMP
router.put("/campgrounds/:id",function (req,res) {
    //find and update the correct
   
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function (err,updated) {
        if(err){
            res.render("/campgrounds");
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }

        
    });
    
})
 function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};
 
 module.exports =router;