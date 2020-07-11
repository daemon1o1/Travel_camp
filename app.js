const { authenticate } = require("passport");

var express     =require("express"),
    app         =express(),
    mongoose    =require("mongoose"),
    bodyparser  =require("body-parser"),
    Campground  =require("./models/campground"),
    passport=require("passport"),
    LocalStrategy =require("passport-local"),
    User=require("./models/user"),
    Comment     =require("./models/comment"),//yha pehle campground tha
    seedDB      =require("./seeds");
    // seedDB(); //seed the database
    
    var  commentRoutes      =require("./routes/comments"),
         campgroundsRoutes  =require("./routes/campgrounds"),
         authRoutes         =require("./routes/index");

process.env.PWD = process.cwd();
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));//dirnam=current directory..static files 
 mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser: true,useUnifiedTopology: true},function(err){});
     
//PASSPORT CONFIGURATION
app.use(require("Express-session")({
    secret:"Hello My name is Shubham Sharma",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req,res,next) {
    res.locals.currentUser=req.user;
    next();
});
//using routes
app.use(commentRoutes);
app.use(campgroundsRoutes);
// app.use("/campgrounds",campgroundsRoutes); we can do this also..so that route m baar baar / na krna pde
app.use(authRoutes);

 //schema setup

//==================
//commment routes

//AUTH ROUTES BY SHUBHAM

    

app.listen(3000,function () {
    console.log("started");
    
});
