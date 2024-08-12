const express = require("express");
const router = express.Router();
const {
  getListByOwner,
  addFriend,
  deleteFriend,
  deleteList,
  getUsersNotFriends,
} = require("../controller/friendList");

router.route("/:ownerId").get(getListByOwner).delete(deleteList);
// Manejo de la lista como coleccion -> Borro la lista, creo una lista, obtengo una lista.
router.route("/:ownerId/:friendId").put(addFriend).delete(deleteFriend);
// Actualizacion de la lista ya creada, agregar un amigo, borrar un amigo.
router.route("/filter/:ownerId").get(getUsersNotFriends);

module.exports = router;
