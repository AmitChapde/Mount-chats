const express=require('express');

const userRoute=require('../routes/user.route');
const authRoute=require('../routes/auth.route');

const router=express.Router();

router.use('/auth',authRoute);
router.use('/users',userRoute);




module.exports=router;