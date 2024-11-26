const JWT = require('jsonwebtoken')
const seriect_Key = '$superman123';

function CreateTokenUser(user){
    const payload ={
        _id:user._id,
        email:user.email,
        password:user.password,
        profileImg:user.profileImg,
        role:user.role
    };

    const token = JWT.sign(payload,seriect_Key);
    
   return token;
}
 function validateToken(token){
const payload = JWT.verify(token,seriect_Key)
return payload;
}
module.exports ={
    CreateTokenUser,
    validateToken,
}