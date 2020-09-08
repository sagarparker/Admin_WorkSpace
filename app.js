var express         =   require("express");
var app             =   express();
var bodyParser      =   require("body-parser");
var mongoose        =   require("mongoose");
var passport        =   require("passport");
var methodOverride  =   require("method-override");
var LocalStrategy   =   require("passport-local").Strategy;
var flash           =   require("connect-flash");
var User            =   require("./models/user");
var clientDetails   =   require("./models/clientDetails");
var frlDetails      =   require("./models/freelancerDetails");
var wsTeam          =   require("./models/wsTeam");
var projects        =   require("./models/project");



// EJS view engine
app.set("view engine","ejs");

// Mongoose connection
mongoose.connect("mongodb+srv://sagarparker:hihellohi8@sagarparker-ccy2e.mongodb.net/workspaceDB?retryWrites=true&w=majority",
{ useNewUrlParser: true,
  useCreateIndex:true,
  useFindAndModify:false,
  useUnifiedTopology:true
}).then(() => {
    console.log("Connected to WorkSpace database(ADMIN)"); 
}).catch(err => {
    console.log("Error connecting to WorkSpace database",err.message);
});

// Middleware
app.use(bodyParser.json());

// BODY_PARSER and PUBLIC DIRECTORY

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));


// FLASH MESSAGES

app.use(flash());





// PASSPORT JS CONFIG

app.use(require("express-session")({
    secret:"encode",
    resave:false,
    saveUninitialized:false
}));
    
app.use(passport.initialize());
app.use(passport.session());


// PASSPORT lOCAL STRATEGY

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    next();
});

// FLASH CONFIG

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error       = req.flash("error");
    res.locals.success     = req.flash("success");
    next();
});


//////////////////////////////////////////////////////

///////////////////////ROUTING////////////////////////

//////////////////////////////////////////////////////

// LOGIN ROUTE


app.get("/workspace/admin/login",function(req,res){
    res.render("loginPage");
});


app.post("/workspace/admin/login", 
  passport.authenticate('local', { failureRedirect: '/workspace/admin/login',failureFlash:true }),
  function(req, res) {
      if(req.user.username == "admin"){
        res.redirect("/workspace/admin/home");
      }
      else{
          req.flash("error","No admin with given username found.");
          res.redirect("/workspace/admin/login")
      }
    
    
});

app.get("/workspace/admin/home",function(req,res){
    frlDetails.find({},function(err,frld){
        clientDetails.find({},function(err,cld){
            wsTeam.find({},function(err,wsd){
                projects.find({},function(err,pjd){
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.render("adminHomePage",{frld:frld,cld:cld,wsd:wsd,pjd:pjd});
                    }
                })
            });
        });
    });
})


// LOGOUT ROUTE
app.get("/workspace/logout",function(req,res){
    req.logOut();
    req.flash('success','Logged out successfully.');
    res.redirect("/workspace/admin/login");

});


// SERVER

app.listen("3001",function(){
    console.log("WorkSpace admin server started");
})
    