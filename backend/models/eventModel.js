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
  northLat: {
    type: String,
    required: [true, "Please add a northLat field"],
  },

  northLong: {
    type: String || null,
    required: [true, "Please add a northLong field"],
  },

  southLat: {
    type: String,
    required: [true, "Please add a southLat field"],
  },

  southLong: {
    type: String,
    required: [false, "Please add a southLong field"],
  },

  centerLat: {
    type: String,
    required: [true, "Please add a centerLat field"],
  },

  centerLong: {
    type: String,
    required: [true, "Please add a centerLong field"],
  },

  pathWidth: {
    type: String,
    required: [true, "Please add a pathWidth field"],
  },

  centerDuration: {
    type: String,
    required: [true, "Please add a centerDuration field"],
  },
});

module.exports = mongoose.model("Event", eventSchema);
