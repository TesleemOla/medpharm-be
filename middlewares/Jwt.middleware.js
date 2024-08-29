// import jwt from "jsonwebtoken"
// import User from "../models/user.model.js"
// import { compare } from "bcrypt"

//  // encode user details


// export const encode= async function(req, res) {
//         const { email, password } = req.body
//     if (!email || !password) res.status(400).json({ success: false, error: "Please provide an email and a password" })
//         User.findOne({email})
//        .then(resp=> {
//             console.log(resp)
//             compare(password, resp.password)
//             .then(response=>{
//                     const payload = {_id: resp._id, email, firstName: resp.firstName, lastName: resp.lastName, access: resp.access};
                   
//                     const options = { expiresIn: "10 days" }
//                     const getToken = jwt.sign(payload, process.env.JWT_SECRET, options)
//                     if (!getToken) res.status(500).json({ error: err.message })
//                             return res.status(200).json({ success: true, token:getToken })

//             })
//             .catch(err=> {
//                 res.status(409).json({ error:err.message})})
//         })
//        .catch(error=> res.status(500).json({success: false, error: "username or password incorrect"}))
   
        
    
//     }
//     // decode user details
//     export const decodeAdmin = function(req, res, next) {
//         if(!req.headers["authorization"]) {
//             return res.status(401).json({ message: "Request headers not added"})
//         }
//         const authHeader = req.headers["authorization"].split(' ')
//         const token = authHeader && authHeader[1]
        
//         if(!token) res.status(401).json({ message: "user not authorized"})
//         jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{

//             if(err) return res.status(403).json({ error: err.message})
//             if(user.access === "admin"){
//             req.user = user
//             }

//             next()
//     })
//     }

//     export const decode =function(req,res, next){
//         if(!req.headers["authorization"]){
//             return res.status(401).json({ message: "Request headers not added"})
//         }
//         const authHeader = req.headers["authorization"].split(" ")
//         const token = authHeader && authHeader[1]

//         if(!token) res.status(401).json({ message: "user not authorized"})
//         jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
//             if(err) return res.status(403).json({ error: err.message})

//                 req.user = user
        
//         })
//         next()
//     }


import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { compare } from "bcrypt";

// Helper function for sending responses
export const sendResponse = (res,status, success, data) => {
    return res.status(status).json({ success, ...data });
};

// Encode user details
export const encode = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return sendResponse( res,400, false, { error: "Please provide an email and a password" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return sendResponse( res,500, false, { error: "Username incorrect" });
        }

        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            return sendResponse( res,409, false, { error: "Password incorrect" });
        }

        const payload = {
            _id: user._id,
            email,
            firstName: user.firstName,
            lastName: user.lastName,
            access: user.access,
        };

        const options = { expiresIn: "10 days" };
        const token = jwt.sign(payload, process.env.JWT_SECRET, options);
        if (!token) {
            return sendResponse( res,500, false, { error: "Error generating token" });
        }

        return sendResponse( res,200, true, { token, ...payload });
    } catch (error) {
        return sendResponse( res,500, false, { error: error.message });
    }
};

// Decode user 
export const decode = (roles)=>{
    return async (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        return sendResponse( res,403, false, { message: "Access denied" });
    }
    try{
        
        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        req.user = decoded
        })
       

        if(!roles.includes(await req?.user?.access)){
            return sendResponse( res,401, false, { message: "user not authorized"} )
        }
        next()
    }
    catch(err){
        console.log(err)
        return sendResponse(res, 400, false, {message:"Invalid Token"})
    }
}
};


