const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  date: {
    type: String,
    required: [true, "Please add a date field"],
  },

  time: {
    type: String,
    required: [true, "Please add a time field"],
  },
  pathWidth: {
    type: String,
    required: [true, "Please add a northLat field"],
  },

  centerDuration: {
    type: String || null,
    required: [true, "Please add a northLong field"],
  },

  northCoordinates: {
    type: Object,
    required: [true, "Please add a southLat field"],
  },

  centerCoordinates: {
    type: Object,
    required: [false, "Please add a southLong field"],
  },

  southCoordinates: {
    type: Object,
    required: [true, "Please add a centerLat field"],
  },
});

module.exports = mongoose.model("Event", eventSchema);
