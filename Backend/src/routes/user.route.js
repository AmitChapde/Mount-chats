const express=require('express');

const userController=require('../controllers/user.controller');


const router=express.Router();
router.get('/:id',userController.getUser);
router.get('/',userController.getAllUsers);



module.exports=router;