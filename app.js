var express          = require("express"),
    bodyParser       = require("body-parser"), // used to convert elements recieved from HTML forms to JSON and process it as a variable values
    app              = express(),
    mongoose         = require("mongoose"),
    Room             = require("./models/rooms"),
    Dorm             = require("./models/dorms"),
    seedDB           = require("./models/seed"),
    passport         = require("passport"),
    LocalStrategy    = require("passport-local"),
    User             = require("./models/user");
    
    
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true})); 
//specifing Express to use body-parser

 
mongoose.connect("mongodb://localhost/sad_sdh2",{ useNewUrlParser: true });



seedDB();
//Passport config
app.use(require("express-session")({
        secret: "This is the Salting string",
        resave: false,
        saveUninitialized:false
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.get("/", function(req,res){
   res.render("landing");
});

app.get("/dorms", function(req,res){
    //get all dorms from DB
    Dorm.find({}, function(err,dorms){
        if(err){
            console.log(err);
        } else{
            console.log(dorms);
            res.render("index",{dorms:dorms});
        }
    });
});

//show moreinfo about Dorm
app.get("/dorms/:id",function(req,res){
    // res.render("show");
    console.log(req.params.id);
    Dorm.findById(req.params.id, function(err, dorm){
        if(err){
            console.log(err);
        } else {
            console.log(dorm);
            res.render("show", {dorm: dorm});
        }
    });
});


app.get("/register",function(req, res) {
    res.render("register");
});

app.post("/register",function(req,res){
    var newUser = new User({email:req.body.email})
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render("register");
            
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/dorms");
        });
    });
});

app.get("/login",function(req,res){
    res.render("login");
});


app.post("/login",passport.authenticate("local",
{
    successRedirect:"/dorms",
    failureRediredt:"/login"
}), function(req,res){
    
});


app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
});


app.listen(process.env.PORT, process.env.IP, function(){console.log("server started")});
