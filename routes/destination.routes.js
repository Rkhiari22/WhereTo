const router = require('express').Router();
const destinationController = require('../controllers/destination.controller');
const multer = require("multer");
const upload = multer();

router.get('/', destinationController.readDestination);
router.post('/', upload.single("file"), destinationController.addDestination);
router.put('/:id', destinationController.updateDestination);
router.delete('/:id', destinationController.deleteDestination);
router.patch('/like-destination/:id', destinationController.likeDestination);
router.patch('/unlike-destination/:id', destinationController.unlikeDestination);

// comments
router.patch('/comment-destination/:id', destinationController.commentDestination);
router.patch('/edit-comment-destination/:id', destinationController.editCommentDestination);
router.patch('/delete-comment-destination/:id', destinationController.deleteCommentDestination);

module.exports = router;