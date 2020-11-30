const { response } = require('express');
const Nexmo = require('nexmo');

var e=require('express');
var bodyParser=require('body-parser');
var JSAlert = require("js-alert");

var app=e();

const passport=require('passport');
var LocalStrategy = require('passport-local');
const session=require('express-session');
const flash=require('connect-flash');

var passportLocalMongoose = require("passport-local-mongoose");
var User = require("./model/user1");
//var User1 = require("./model/user1");
app.set("view engine","ejs");

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(e.static(__dirname + '/public'));
app.use(flash());
app.use(require("express-session")({
    secret: " Once agains Rusty is cutest",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());



const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/e_vote',{useNewUrlParser: true},{useUnifiedTopology:true});

var db=mongoose.connection; 

db.once('open',function()
{
    console.log('success'
    );
});
db.on('error',function(err)

{
    console.log("error",err);
});
const credentials=db.collection('credentials');
app.locals.credentials=credentials;
const collection = db.collection('images.files');
    const collectionChunks = db.collection('images.chunks');
    //const collection1 = db.collection('candidates.files');
    //const collectionChunks1 = db.collection('candidates.chunks');
    

passport.use(new LocalStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//passport.authenticate('local')

app.use(function(req,res,next)
{
    res.locals.currentUser = req.user;
    next();
});

  app.get("/data",function(req,res)

  {
res.render("data");
  } );  
  app.get("/g11",function(req,res)

  {
res.render("g11");
  } );   
  
  app.get("/g1",function(req,res)

  {
res.render("g1");
  } ); 

  app.get("/g2",function(req,res)

  {
res.render("g2");
  } ); 

  app.get("/g3",function(req,res)

  {
res.render("g3");
  } ); 

  app.get("/g4",function(req,res)

  {
res.render("g4");
  } ); 
  app.get("/g6",function(req,res)

  {
res.render("g6");
  } ); 

  app.get("/g8",function(req,res)

  {
res.render("g8");
  } ); 

  app.get("/g9",function(req,res)

  {
res.render("g9");
  } ); 


  app.get("/g10",function(req,res)

  {
res.render("g10");
  } ); 

  app.get("/g12",function(req,res)

  {
res.render("g12");
  } ); 

  app.get("/g13",function(req,res)

  {
res.render("g13");
  } ); 


  app.get("/g14",function(req,res)

  {
res.render("g14");
  } );
  
  
  app.get("/g16",function(req,res)

  {
res.render("g16");
  } ); 


  app.get("/g17",function(req,res)

  {
res.render("g17");
  } ); 


  app.get("/g18",function(req,res)

  {
res.render("g18");
  } ); 
  
   
   app.post("/signup",function(req,res)
   {
    var voterid = req.body.username; 
   // var age=req.body.age;
    var mnum = req.body.mnumber;
   // var anum = req.body.anumber; 
    var email = req.body.mail; 
   // var pass = req.body.pass; 
  //  var redi;
  var ans;
  
  
 
    db.collection("voters").findOne({voterno:voterid}, function(err, result1){
        
        if(err)
        {
            throw err;
                }
        else{
            
        if(result1==null)
        {console.log(result1);
            res.render("error");
    }
    else
    
{
      ans=mnum.localeCompare(result1.phoneno);
    
      console.log(result1.phoneno);
      console.log(ans);


    
    if(ans==0)
    { console.log(ans);
       User.register(new User({username :req.body.username}),req.body.password,function(err,user)
       {

           if(err)
           {
               console.log(err);
               res.redirect("/check5");
           }
           else
           {
             // passport.authenticate("local")(req,res,function()
              // {
                
                 
                   res.redirect("/check3");
   
              //});
           }
       });
    }
    else{console.log(ans);
        res.redirect("/check4");
    }
}
    }
});
    

    });

    app.get('/candidate',function(req,res){ 
        res.render("candidate");
        });

app.post("/login",passport.authenticate("local",{
       //var abi=req.body.username;
  // successRedirect : "/check1",
    failureRedirect : "/check1"
}),
function(req,res)
{var abi=req.body.username;
    console.log(abi);
    
    res.redirect("/check2/"+abi);
});


app.get('/type',function(req,res){ 
    res.render("type");
    });
app.post("/type",function(req,res)
{var usertype=req.body.usertype1;
    console.log(usertype);
    var ans;
    ans=usertype.localeCompare("user");
    if(ans==0)
    {
    res.redirect("/signup");
    }
    else{
        res.redirect("/candidate");
    }
})

app.get('/check3',function(req,res){ 
    res.render("check3")
});
app.get('/error44',function(req,res){ 
  res.render("error44")
});
app.post("/candidate",function(req,res)
    {
     var candiid = req.body.candidateid; 
    // var age=req.body.age;
     var mnum = req.body.mnumber;
    // var anum = req.body.anumber; 
    // var email = req.body.mail; 
    // var pass = req.body.pass; 
   //  var redi;
   var ans;
   
   
  
     db.collection("candidates").findOne({candidateid:candiid}, function(err, result2){
         
         if(err)
         {
             throw err;
                 }
         else{
             
         if(result2==null)
         {console.log(result2);
             res.render("error44");
     }
     else
     
 {
       ans=mnum.localeCompare(result2.phoneno1);
      //console.log(result1.voterid);
       console.log(result2.phoneno1);
       console.log(ans);
 
 var abi=req.body.password1;
     
     if(ans==0)
     { console.log(ans);
        User.register(new User({username :req.body.candidateid}),abi,function(err,user)
        {
 
            if(err)
            {
                console.log(err);
                res.redirect("/check51");
            }
            
            else{
               
                 res.redirect("/check3");
            }
    
                
            
        });
     }
     else{
         console.log(ans);
         res.redirect("/check41");
     }
 }
     }
 });
     
 
     });





app.get('/check51',function(req,res){ 
        res.render("check51");
        });

 app.get('/check41',function(req,res){ 
            res.render("check41");
            });
    

app.get('/hello',function(req,res){ 
    res.render("hello");
    });


   /* app.post('/hello',function(req,res){ 
      var id=req.body.vno1;
      console.log(id);
      res.render("hello",{
        id1:id,
      });
      });*/
      app.get('/voted',function(req,res){ 
        res.render("voted");
        });

      app.post('/voted',function(req,res){ 
        var id=req.body.vno1;
        var party=req.body.party;
        db.collection("voting").insertOne({voterno:id,party:party});
        db.collection("votes").findOne({party:party}, function(err, result){
          var vote=result.votes;
          console.log(vote);
          var v=parseInt(vote);
          var spawn = require("child_process").spawn; 

          db.collection("voters").findOne({voterno:id}, function(err, result){  
            var year=result.year;
            console.log(year);
            var y=parseInt(year);
            var age=2020-y;
            var agegrp;
            if(age>=18 && age<=30)
             agegrp="youth";
             else if(age>=30 && age<=40 )
             agegrp="adult";
             else
             agegrp="oldage";
             console.log(agegrp);

    var process = spawn('python',["./appcsv.py",id,age,party,agegrp] ); 
    console.log("called");
          });

          v++;
          console.log(v);
          var fv=v.toString();
          console.log(fv);
         // db.mycol.update({'title':'MongoDB Overview'},{$set:{'title':'New MongoDB Tutorial'}})
          db.collection("votes").updateOne({party:party},{$set:{'votes':fv}});
          res.render("voted");

        });

       
        });
   
    app.get('/hello1',function(req,res){ 
        res.render("hello1");
        });

app.get('/',function(req,res){ 
    res.render("homepage");
    });
    app.get('/check5',function(req,res){ 
        res.render("check5");
        });
app.get('/homepage',function(req,res){ 
        res.render("homepage");
        });
        app.get('/error11',function(req,res){ 
          res.render("error11");
          });
          app.get('/error22',function(req,res){ 
            res.render("error22");
            });
//var can=require("./views/check2.ejs");
 app.get('/candetail',function(req,res){ 
         // var vno=can.id1;
         // console.log(vno);
          res.render("candetail");
          });
app.post('/candetail',function(req,res){ 
             var party=req.body.party;
             var ac=req.body.ac;
             if(ac>=10 && ac<=12)
             {
             console.log(ac);
            console.log(party);
            db.collection("candidates").findOne({party:party,ac_no:ac}, function(err, result2){
var id=result2.candidateid;
res.redirect("/check2/"+id);

            });
          }
          else
          {
            res.redirect("error11");
          }
             
             });


app.get('/signup',function(req,res){ 
    res.render("signup");
});
app.get('/intermediate',function(req,res){ 
  res.render("intermediate");
});
app.post('/intermediate2',function(req,res){
    var id=req.body.vno1;
    var p=req.body.pno1;
    console.log(id);
    console.log(p);
    db.collection("admin").findOne({status:"start"},function(req2,res2){
      if(res2==null)
      res.render("error22");
      else
      {
    db.collection("voting").findOne({voterno:id},function(req1,res1){
      if(res1==null)
      res.render('intermediate',{id1:p,id2:p,vno:id});

       
       else
       res.render("error33");
       
    });
  }
  });
   
});


    app.get('/facecheck',function(req,res)
    {
        res.render('facecheck');    })

        app.get('/errorotp',function(req,res)
    {
        res.render('errorotp');    })
app.post('/intermediate1',function(req,res)
{
var phn=req.body.phoneno1;
var otpe=req.body.otp1;
var vno=req.body.voter;
var ans;
console.log(phn);
console.log(vno);
//var otpcheck;
db.collection("otp").findOne({phoneno:phn}, function(err, result2){
//otpcheck=result2.otp;
console.log(result2.otp);
ans=otpe.localeCompare(result2.otp);
if(ans==0)
res.render('facecheck',{id:vno});
else
res.render('errorotp');


});



});
app.post('/intermediate',function(req,res){
 var phone1=req.body.phoneno; 
   console.log(phone1);
 //var  phone1='91'+phone;
const nexmo = new Nexmo({
  apiKey: '15d74a4c',
  apiSecret: 'Xtlq8xMCwiXZRbNJ',
});
var string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; 
    var OTP = ''; 
      
    // Find the length of string 
    var len = string.length; 
    for (let i = 0; i < 6; i++ ) { 
        OTP += string[Math.floor(Math.random() * len)]; 
    } 
  console.log(OTP);  
const from = 'Voting password';
const to = phone1;
const text = OTP;

nexmo.message.sendSms(from, to, text);
db.collection("otp").findOne({phoneno:phone1},function(err,result){
  if(result==null)
  {
    console.log("no");
    db.collection("otp").insertOne({phoneno:phone1,otp:OTP})

  }
  else
  {
    db.collection("otp").updateOne({phoneno:phone1},{$set:{'otp':OTP}});
  }

});;

});

app.post('/python', function(req,res){ 
    var nam = req.body.voterid; 
    var ans;
  //  var voterid=req.body.voterid;
    //var pas=req.body.password;
    var spawn = require("child_process").spawn; 
    var process = spawn('python',["./abi1.py",nam] ); 
   // ans=mnum.localeCompare(result.phoneno);
  var abi;
    
    process.stdout.on('data', function(data) { 
abi=data.toString();
console.log(abi);
        ans=abi.localeCompare("Welcome");
        console.log(ans);
        if(ans>0)
        
        res.render("hello",{id1:nam});
        else
        res.render("hello1");

 
});
});
/*app.get('/check2',function(req,res){ 
    res.render("signup");
})*/

app.get('/check2/:id',function(req,res){
   // var id=req.body.username;
    var pno,src1,date,month,year,name,addr,district,state,pincode,ac_no,gender,src2,party,src3,finalFile,finalFile1;
    
    var number=req.params.id;
    console.log(number);
    if(number>=1000000)
    {
    db.collection("voters").findOne({voterno:number}, function(err, result) {
            if (result==null)
            res.render("error");
            else
            {
               // var bufs = [];
                pno=result.phoneno;
               src1=result.img;
               date=result.date;
               gender=result.gender;
               month=result.month;
               year=result.year;
               name=result.name;
               addr=result.addr;
               district=result.district;
               state=result.state;
               pincode=result.pincode;
               ac_no=result.ac_no;

               console.log(src1);
           // age=result.age;
              //  mail=result.email;
             // src1
             // contentType: 'image/png'
             
    collection.find({_id: src1}).toArray(function(err, docs){
      if(err){
        return res.render("error");
      }
      if(!docs || docs.length === 0){
        return res.render("error");
      }
      else{
        //Retrieving the chunks from the db
        collectionChunks.find({files_id : docs[0]._id}).sort({n: 1}).toArray(function(err, chunks){
          if(err){
            return res.render("error");
          }
          if(!chunks || chunks.length === 0){
            //No data found
            return res.render("error");
          }
          //Append Chunks
          let fileData = [];
          for(let i=0; i<chunks.length;i++){
            //This is in Binary JSON or BSON format, which is stored
            //in fileData array in base64 endocoded string format
            fileData.push(chunks[i].data.toString('base64'));
          }
          //Display the chunks using the data URI format
          let finalFile = 'data:' + docs[0].contentType + ';base64,' + fileData.join('');
         // res.render('imageView', {title: 'Image File', message: 'Image loaded from MongoDB GridFS', imgurl: finalFile});
    
        res.render("check2",{
            id1:number,
            pno:pno,
            src:finalFile,
            gender:gender,
            date:date,
            month:month,
            pincode:pincode,
            state:state,
            district:district,
            ac_no:ac_no,
            addr:addr,
            name:name,
            year:year,
      } );  
    });
          
          
          //  age:age,
          //  mail:mail,
    
    
        }
        
    
    });//

    }  
}); 

}
else{
    db.collection("candidates").findOne({candidateid:number}, function(err, result1) {
        
        if (result1==null) 
        {
            res.render("error");
        }
        else
        {console.log(number);
            pno=result1.phoneno1;
            src2=result1.img;
            console.log(src2);
            date=result1.date;
               gender=result1.gender;
               month=result1.month;
               year=result1.year;
               name=result1.name;
               party=result1.party;
               ac_no=result1.ac_no;
            collection.find({_id: src2}).toArray(function(err, docs){
                if(err){
                  return res.render("error");
                }
                if(!docs || docs.length === 0){
                  return res.render("error");
                }
                else{
                  //Retrieving the chunks from the db
                  collectionChunks.find({files_id : docs[0]._id}).sort({n: 1}).toArray(function(err, chunks){
                    if(err){
                      return res.render("error");
                    }
                    if(!chunks || chunks.length === 0){
                      //No data found
                      return res.render("error");
                    }
                    //Append Chunks
                    let fileData = [];
                    for(let i=0; i<chunks.length;i++){
                      //This is in Binary JSON or BSON format, which is stored
                      //in fileData array in base64 endocoded string format
                      fileData.push(chunks[i].data.toString('base64'));
                    }
                    //Display the chunks using the data URI format
                     finalFile = 'data:' + docs[0].contentType + ';base64,' + fileData.join('');
                
                   // res.render('imageView', {title: 'Image File', message: 'Image loaded from MongoDB GridFS', imgurl: finalFile});
                   db.collection("party").findOne({party:party}, function(err, result2) {
                       src3=result2.img;
                       collection.find({_id: src3}).toArray(function(err, docs1){
                        if(err){
                          return res.render("error");
                        }
                        if(!docs1 || docs1.length === 0){
                          return res.render("error");
                        }
                        else{
                          //Retrieving the chunks from the db
                          collectionChunks.find({files_id : docs1[0]._id}).sort({n: 1}).toArray(function(err, chunks1){
                            if(err){
                              return res.render("error");
                            }
                            if(!chunks1 || chunks1.length === 0){
                              //No data found
                              return res.render("error");
                            }
                            //Append Chunks
                            let fileData1 = [];
                            for(let i=0; i<chunks1.length;i++){
                              //This is in Binary JSON or BSON format, which is stored
                              //in fileData array in base64 endocoded string format
                              fileData1.push(chunks1[i].data.toString('base64'));
                            }
                            //Display the chunks using the data URI format
                            finalFile1 = 'data:' + docs1[0].contentType + ';base64,' + fileData1.join('');
                        

                  res.render("check21",{
                    id1:number,
                    pno:pno,
                    src:finalFile,
                    gender:gender,
                    date:date,
                    month:month,
                    year:year,
                   party:party,
                    ac_no:ac_no,
                    src1:finalFile1,
                    name:name,
                }); 
            });
        }
    });
});
});
}
});
            }
        });
    }
                    
                    
                    
              
              
                 




});





app.get('/login',function(req,res){ 
    res.render("login");
    });

app.get('/check1',function(req,res){ 
    res.render("check1")
    
});

app.get('/error',function(req,res){ 
        res.render("error");
    
});
app.get('/check4',function(req,res){ 
    res.render("check4")
    
});
app.get('/votes',function(req,res){ 
  res.render("votes")
  
});
app.post('/results',function(req,res){ 
  db.collection("votes").find().toArray((err, result) =>{

    console.log(result);
    console.log(result.length);
    var votes=[];
    var sorta=[];
            for(i=0;i<result.length;i++)
            {
              var name=result[i].party.toString();
              var v=result[i].votes.toString();
            
              console.log(name);
              console.log(v);
             votes[i]={party:name,vote:v}
             sorta[i]=v;

            } 
            console.log(votes);
            console.log(sorta);
            sorta.sort();
            sorta.reverse();
            console.log(sorta);
            console.log(votes[1].vote);

            res.render("votes",{votes:votes});




  });

});
        
app.listen(3006,function()
{
console.log("server listening at port 3006"); 
});