//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "This is a blog website , share your posts !";
const homeaboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

let POSTS=[];
const firstpost={
  heading : "fp",
  content:homeStartingContent 
};
POSTS.push(firstpost);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//home-route
app.get("/",function(req,res){
  res.render("home" , {Posts:POSTS});
});

//about-route
app.get("/about",function(req,res){
  res.render("about" , {about:homeaboutContent});
});

//contact-route
app.get("/contact",function(req,res){
  res.render("contact" , {contact:contactContent});
});

//compose-route
app.get("/compose",function(req,res){
  res.render("compose");
});

app.get("/posts/:title",function(req,res){
  // console.log(req.params.title);
  for(var i=1;i<POSTS.length;i++){
    if(_.lowerCase(POSTS[i].heading) === _.lowerCase(req.params.title))
    {
      // console.log("Match found");
      res.render("post",{requestedPost:POSTS[i]});
      break;
    }
    else{
      res.render("post",{requestedPost:{heading:"No such post found",content:""}});
    }
  }
  
});

//posting-from-commpose-page
app.post("/compose",function(req,res){
const post = {
  heading:req.body.posttitle,
  content:req.body.postcontent
};
POSTS.push(post);

res.redirect("/");
});








app.listen(process.env.PORT || 3000,function(){
  console.log("Listening!");
});
