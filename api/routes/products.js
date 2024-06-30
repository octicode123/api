const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const authCheck =require('../../midlleware/auth-check');
// Configure multer for file storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload an image.'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5 MB limit
  }
});

router.get('/',authCheck, (req, res, next) => {
  res.status(200).json({
    message: 'handling get request /products'
  });
});

router.post('/', upload.single('image'), (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      message: 'No image file uploaded'
    });
  }
  
  res.status(200).json({
    message: 'Image uploaded successfully',
    imageUrl: req.file.path
  });
});

// Error handling middleware
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        message: 'File is too large. Max size is 5 MB.'
      });
    }
  }
  // Handle other errors
  res.status(500).json({
    message: 'An unknown error occurred.',
    error: error.message
  });
});

module.exports = router;