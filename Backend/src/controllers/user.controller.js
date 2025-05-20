const httpStatus=require('http-status');
const ApiError=require('../utils/ApiError');
const {userService}=require('../services');


const getUser=async(req,res,next)=>{
    try {
        const user=await userService.getUserById(req.params.id);
        if(!user){
            return res.status(404).send({messge:'User not Found'})
        }
        res.status(200).send(user);
    } catch (error) {
        next(error)
    }
}


const createUser=async (req,res,next)=>{
    try {
        let user=await userService.createUser(req.body);
        res.status(201).send(user);
    } catch (error) {
        next(error)
    }
    
}

const getAllUsers=async (req,res,next) => {
    try {
        let users=await userService.getAllUsers();
        if(!users || users.length===0){
            return res.status(404).send({message:'No Users Found'})
        }
        res.status(200).send(users);
    } catch (error) {
        next(error)
    }
}

module.exports={getUser,createUser,getAllUsers};