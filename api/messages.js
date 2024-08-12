const express = require("express");
const router = express.Router();

const {
  getMessageById,
  createNewMessage,
  deleteMessage,
  updateMessage,
  getAllByUser,
  getAllArchived,
  archiveMessage,
  deleteArchivedMessage,
  getFilterMessages,
} = require("../controller/messages");

router
  .route("/:id")
  .get(getMessageById)
  .delete(deleteMessage)
  .patch(updateMessage);

///filter?sender=:id&receiver=:id&date=:date
router.route("/").get(getFilterMessages).post(createNewMessage);
// router.route("/filter/test").get(getFilterMessages); // Change the name

// UF
router.route("/filter/:id").get(getAllByUser);

// UF
router.route("/archived-messages/:id").get(getAllArchived).post(archiveMessage).delete(deleteArchivedMessage);

module.exports = router;
