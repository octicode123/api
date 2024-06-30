const express =require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message :'handling get request /orders'
    })
})

router.post('/',(req,res,next)=>{
    res.status(201).json({
        message :'handling post request /orders'
    })
})

router.get('/:orderId',(req,res,next)=>{
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


router.delete('/:orderId',(req,res,next)=>{
    const id = req.params.productId;
    res.status(200).json({
        message :'delted successfully',
        id :id
    })
   
})
router.patch('/:orderId',(req,res,next)=>{
    const id = req.params.productId;
    res.status(200).json({
        message :'updated successfully',
        id :id
    })
   
})
module.exports=router;