const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select("-password");
    res.status(200).json(users);
  };

  module.exports.userInfo = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        const user = await UserModel.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

        res.status(200).json(user);
    } catch (err) {
        console.log("Erreur userInfo :", err);
        res.status(500).json({ error: err.message });
    }
};

module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { bio: req.body.bio } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await UserModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Utilisateur supprimé avec succès." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};