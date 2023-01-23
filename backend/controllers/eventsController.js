const asyncHandler = require("express-async-handler");

const Event = require("../models/eventModel");

const getEvents = async (req, res) => {
  const events = await Event.find();
  res.status(200).json(events);
};

const getEventsById = async (req, res) => {
  const events = await Event.find({ _id: req.params.id });
  res.status(200).json(events);
};

const addEvents = asyncHandler(async (req, res) => {
  if (!req.query) {
    res.status(400);
    throw new Error("Please add an event");
  }
  const event = await Event.create({
    date: req.query.date,
    time: req.query.time,
    northLat: req.query.northLat,
    northLong: req.query.northLong,
    southLat: req.query.southLat,
    southLong: req.query.southLong,
    centerLat: req.query.centerLat,
    centerLong: req.query.centerLong,
    pathWidth: req.query.pathWidth,
    centerDuration: req.query.centerDuration,
  });
  res.status(200).json(event);
});

const updateEvents = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(400);
    throw new Error("Event not found");
  }
  const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.query, {
    new: true,
  });
  res.status(200).json(updatedEvent);
});

const deleteEvents = asyncHandler(async(req, res) => {
    const event = await Event.findById(req.params.id);
    if (!event) {
        res.status(400);
        throw new Error("Event not found");
      }
      await Event.remove()
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getEvents,
  getEventsById,
  addEvents,
  updateEvents,
  deleteEvents,
};
