const express=require("express");
const app=express();
const path=require("path");
const fs=require("fs");
app.set("view engine","ejs");
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));

const data = "Your data here";

app.get("/",function(req,res){
     fs.readdir(`./file`,function(err,file){
          res.render("index",{file});

     })
});
app.get("/create",function(req,res){
     res.render("create");
})



app.post("/createhisab",function(req,res){
     const today = new Date(); 
     const date = today.getDate(); 
     const month = today.getMonth() + 1; 
     const year = today.getFullYear(); 
     const formattedDate = `${date}-${month}-${year}`;
     console.log(formattedDate);
     fs.writeFile(`./file/${formattedDate}`, req.body.content, (err) => {
          if (err) console.log(err);
          else {
              res.redirect("/");
          }
      });
})
app.get("/edit/:filename",function(req,res){
     const filename = req.params.filename;
     fs.readFile(`./file/${filename}`,"utf-8",function(err,data){
          if(err){
               return res.send(err);
          }else{
          res.render("edit",{data,filename});
     }
     });
})
app.post("/update/:filename",function(req,res){
     fs.writeFile(`./file/${req.params.filename}`,req.body.filedata,function(err,data){
          if(err){
               return res.send(err);
          }
         else{
          res.redirect("/");
         } 
     })
})

app.get("/hisab/:filename",function(req,res){
     fs.readFile(`./file/${req.params.filename}`,"utf-8",function(err,data){
          if(err){return res.status(500).send(err);
          }
          res.render("hisab",{data,filename:req.params.filename})
     })
     

     
})

app.get("/delete/:filename",function(req,res){
     fs.unlink(`./file/${req.params.filename}`,function(err){
          if(err){
               return res.send(err);
          }
          res.redirect("/");
     })
})



app.listen(3000,function(){
     console.log("connected");
})
