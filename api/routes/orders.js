const express =require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'aProjet'
  };
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

router.get('/:orderId', async (req, res, next) => {
    const orderId = req.params.orderId;
    try {
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
    
        // Query to get order details
        const [rows] = await connection.execute(
          'SELECT * FROM orderdetails WHERE order_id = ?',
          [orderId]
        );
    
        // Close the database connection
        await connection.end();
    
        if (rows.length > 0) {
          // Order details found
          res.status(200).json({
            message: 'Order details found!',
            orderDetails: rows
          });
        } else {
          // Order not found
          res.status(404).json({
            message: 'Order not found.'
          });
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({
          message: 'An error occurred while fetching order details. Please try again.'
        });
    }
});


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