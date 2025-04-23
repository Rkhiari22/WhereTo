const DestinationModel = require("../models/destination.model");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const path = require("path");
const { uploadErrors } = require("../utils/errors.utils");

// Helper pour la gestion des erreurs
const handleErrorResponse = (res, error, customMessage = "") => {
  console.error(customMessage, error);
  const statusCode = error.name === 'ValidationError' ? 400 : 500;
  return res.status(statusCode).json({
    success: false,
    message: customMessage || error.message || "Une erreur est survenue"
  });
};

// Récupérer toutes les destinations
module.exports.readDestination = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};

    if (category) {
      query.categorie = category;
    }

    const destinations = await DestinationModel.find(query)
      .sort({ createdAt: -1 })
      .select("-comments"); // Exclut les commentaires pour la liste principale

    res.status(200).json({
      success: true,
      count: destinations.length,
      data: destinations
    });
  } catch (err) {
    handleErrorResponse(res, err, "Erreur lors de la récupération des destinations:");
  }
};

// Récupérer une destination spécifique
module.exports.getDestination = async (req, res) => {
  try {
    if (!ObjectID.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "ID invalide"
      });
    }

    const destination = await DestinationModel.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination non trouvée"
      });
    }

    res.status(200).json({
      success: true,
      data: destination
    });
  } catch (err) {
    handleErrorResponse(res, err, "Erreur lors de la récupération de la destination:");
  }
};

// Créer une nouvelle destination
module.exports.addDestination = async (req, res) => {
  try {
    // Validation basique
    if (!req.body.name || !req.body.description || !req.body.categorie) {
      return res.status(400).json({
        success: false,
        message: "Nom, description et catégorie sont obligatoires"
      });
    }

    const newDestination = new DestinationModel({
      posterId: req.body.posterId,
      name: req.body.name,
      description: req.body.description,
      address: req.body.address,
      categorie: req.body.categorie,
      picture: req.file ? `/uploads/destinations/${req.file.filename}` : "",
      priceRange: {
        min: req.body.minPrice || 0,
        max: req.body.maxPrice || 0
      },
      likers: [],
      comments: []
    });

    const savedDestination = await newDestination.save();
    
    res.status(201).json({
      success: true,
      data: savedDestination
    });
  } catch (err) {
    handleErrorResponse(res, err, "Erreur lors de la création de la destination:");
  }
};

// Mettre à jour une destination
module.exports.updateDestination = async (req, res) => {
  try {
    if (!ObjectID.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "ID invalide"
      });
    }

    const updatedData = {
      ...req.body,
      ...(req.file && { picture: `/uploads/destinations/${req.file.filename}` })
    };

    const updatedDestination = await DestinationModel.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    if (!updatedDestination) {
      return res.status(404).json({
        success: false,
        message: "Destination non trouvée"
      });
    }

    res.status(200).json({
      success: true,
      data: updatedDestination
    });
  } catch (err) {
    handleErrorResponse(res, err, "Erreur lors de la mise à jour de la destination:");
  }
};

// Supprimer une destination
module.exports.deleteDestination = async (req, res) => {
  try {
    if (!ObjectID.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "ID invalide"
      });
    }

    const destination = await DestinationModel.findByIdAndDelete(req.params.id);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination non trouvée"
      });
    }

    // Supprimer l'image associée si elle existe
    if (destination.picture) {
      const imagePath = path.join(__dirname, "../client/public", destination.picture);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({
      success: true,
      message: "Destination supprimée avec succès"
    });
  } catch (err) {
    handleErrorResponse(res, err, "Erreur lors de la suppression de la destination:");
  }
};

// Gestion des likes
module.exports.likeDestination = async (req, res) => {
  try {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.userId)) {
      return res.status(400).json({
        success: false,
        message: "ID(s) invalide(s)"
      });
    }

    const destination = await DestinationModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likers: req.body.userId } },
      { new: true }
    );

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination non trouvée"
      });
    }

    res.status(200).json({
      success: true,
      data: destination
    });
  } catch (err) {
    handleErrorResponse(res, err, "Erreur lors de l'ajout du like:");
  }
};

module.exports.unlikeDestination = async (req, res) => {
  try {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.userId)) {
      return res.status(400).json({
        success: false,
        message: "ID(s) invalide(s)"
      });
    }

    const destination = await DestinationModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { likers: req.body.userId } },
      { new: true }
    );

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination non trouvée"
      });
    }

    res.status(200).json({
      success: true,
      data: destination
    });
  } catch (err) {
    handleErrorResponse(res, err, "Erreur lors de la suppression du like:");
  }
};

// Gestion des commentaires
module.exports.commentDestination = async (req, res) => {
  try {
    if (!ObjectID.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "ID invalide"
      });
    }

    if (!req.body.text || !req.body.commenterId || !req.body.commenterPseudo) {
      return res.status(400).json({
        success: false,
        message: "Tous les champs du commentaire sont obligatoires"
      });
    }

    const updatedDestination = await DestinationModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime()
          }
        }
      },
      { new: true }
    );

    if (!updatedDestination) {
      return res.status(404).json({
        success: false,
        message: "Destination non trouvée"
      });
    }

    res.status(200).json({
      success: true,
      data: updatedDestination.comments
    });
  } catch (err) {
    handleErrorResponse(res, err, "Erreur lors de l'ajout du commentaire:");
  }
};

// Mettre à jour un commentaire
module.exports.editCommentDestination = async (req, res) => {
  try {
    if (!ObjectID.isValid(req.params.id) || !req.body.commentId) {
      return res.status(400).json({
        success: false,
        message: "ID(s) invalide(s)"
      });
    }

    const destination = await DestinationModel.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination non trouvée"
      });
    }

    const commentIndex = destination.comments.findIndex(
      comment => comment._id.toString() === req.body.commentId
    );

    if (commentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Commentaire non trouvé"
      });
    }

    // Vérifier que l'utilisateur est l'auteur du commentaire
    if (destination.comments[commentIndex].commenterId !== req.body.userId) {
      return res.status(403).json({
        success: false,
        message: "Non autorisé à modifier ce commentaire"
      });
    }

    destination.comments[commentIndex].text = req.body.text;
    const savedDestination = await destination.save();

    res.status(200).json({
      success: true,
      data: savedDestination.comments[commentIndex]
    });
  } catch (err) {
    handleErrorResponse(res, err, "Erreur lors de la modification du commentaire:");
  }
};

// Supprimer un commentaire
module.exports.deleteCommentDestination = async (req, res) => {
  try {
    if (!ObjectID.isValid(req.params.id) || !req.body.commentId) {
      return res.status(400).json({
        success: false,
        message: "ID(s) invalide(s)"
      });
    }

    const destination = await DestinationModel.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination non trouvée"
      });
    }

    const commentIndex = destination.comments.findIndex(
      comment => comment._id.toString() === req.body.commentId
    );

    if (commentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Commentaire non trouvé"
      });
    }

    // Vérifier que l'utilisateur est l'auteur du commentaire ou admin
    if (destination.comments[commentIndex].commenterId !== req.body.userId) {
      return res.status(403).json({
        success: false,
        message: "Non autorisé à supprimer ce commentaire"
      });
    }

    destination.comments.splice(commentIndex, 1);
    const savedDestination = await destination.save();

    res.status(200).json({
      success: true,
      message: "Commentaire supprimé avec succès"
    });
  } catch (err) {
    handleErrorResponse(res, err, "Erreur lors de la suppression du commentaire:");
  }
};