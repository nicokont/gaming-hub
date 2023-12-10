import mongoose from "mongoose";

const gameSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 30
    },
    category: {
      type: String,
      required: true,
      maxlength: 30
    },
    releaseYear: {
      type: Number,
      required: true,
      min: 1950,
      max: 2050
    },
    rating: {
      type: Number,
      required: false,
      min: 1,
      max: 10
    },
    hoursPlayed: {
      type: Number,
      required: false,
      min: 1,
      max: 10000
    },
    notes: {
      type: String,
      required: false
    }
  }
)

export const Game = mongoose.model('Game', gameSchema)