const router = require('express').Router();
const areaController = require('../controllers/area.controller');
const multer = require("multer");
const upload = multer();

router.get('/', areaController.readArea);
router.post('/', upload.single("file"), areaController.addArea);
router.put('/:id', areaController.updateArea);
router.delete('/:id', areaController.deleteArea);
router.patch('/like-post/:id', areaController.likeArea);
router.patch('/unlike-post/:id', areaController.unlikeArea);

// comments
router.patch('/comment-post/:id', areaController.commentArea);
router.patch('/edit-comment-post/:id', areaController.editCommentArea);
router.patch('/delete-comment-post/:id', areaController.deleteCommentArea);

module.exports = router;