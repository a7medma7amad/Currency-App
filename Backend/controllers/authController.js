const jwt = require("jsonwebtoken")
const bcrypt=require("bcrypt")
const User = require("../Models/User");


 const register =async(req,res)=>{
    console.log("register")
    console.log(req.body)
  const user = req.body;
  const takenUser= await User.findOne({username:user.username})
  const takenEmail = await User.findOne({email:user.email})

  if(takenUser || takenEmail){
    res.json({message:"taken user or email"})
  }else{
    user.password= await bcrypt.hash(req.body.password,10)

    const dbUser= new User({
      username:user.username.toLowerCase(),
      email:user.email.toLowerCase(),
      password:user.password
    })
    dbUser.save()
    res.json({message:"Success"})
  }
}

const login = (req,res)=>{
  const userLoggingIn = req.body;

  User.findOne({username:userLoggingIn.username})
  .then(dbUser=>{
    if(!dbUser){
      return res.json({message:"invalid user or pass"})
    }bcrypt.compare(userLoggingIn.password,dbUser.password)
    .then(isCorrect=>{
        console.log("user exists")
      if(isCorrect){
      const payload={
        id:dbUser._id,
        username:dbUser.username,
      }
      jwt.sign(
        payload,
        'secret',
        {expiresIn:86400},
        (err,token)=>{
          if(err) return res.json({message:err})
          return res.json({
            message:"Success",
            token:"Bearer"+token
          })
          
        }
      )
      }else{
        return res.json({
          message:"invlid user or password"
        })
      }
    })

  })
}

function verifyJWT(req,res,next){
  const token=req.headers["x-access-token"]?.split(' ')[1]

  if(token){
    jwt.verify(token,process.env.PASSPORTSECRET,(err,decoded)=>{
      if(err) return res.json({
        isLoggedIn:false,
        message:"failed to authenticate"
      })
      req.user={};
      req.user.id=decoded.id
      req.user.username=decoded.username
      next()
    })
  }else{
    res.json({message:"incoorect token given",isLoggedIn:false})
  }
}

module.exports =
{
    register,
    login
}
