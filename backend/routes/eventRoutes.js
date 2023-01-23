const express = require("express");
const router = express.Router();
const {
  getEvents,
  addEvents,
  getEventsById,
  updateEvents,
  deleteEvents,
} = require("../controllers/eventsController");

router.route("/").get(getEvents).post(addEvents);

router.route("/:id").get(getEventsById).put(updateEvents).delete(deleteEvents);

module.exports = router;
