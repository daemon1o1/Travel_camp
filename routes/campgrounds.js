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
 
 router.get("/campgrounds/new",function (req,res) {
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
 
 router.post("/campgrounds",function (req,res) {
     var name=req.body.name;
     var image=req.body.image;
     console.log(image);
     var newcampground={name:name,image:image};
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
 
 module.exports =router;