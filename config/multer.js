const multer = require('multer');

// Configuration basique sans diskStorage
const upload = multer({
  dest: 'client/public/uploads/',
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

module.exports = upload;