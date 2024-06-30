const express =require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message :'handling get request /products'
    })
})

router.post('/',(req,res,next)=>{
    res.status(200).json({
        message :'handling post request /products'
    })
})

router.get('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    if(id==='000'){
        res.status(200).json({
            message :'this is spacial id',
            id :id
        })
    }else{
        res.status(200).json({
            message :'you passed an id'
        })
    }
   
})

module.exports=router;