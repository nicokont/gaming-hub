import express from 'express'
import { Game } from '../models/gameModel.js'

const router = express.Router()

// Route for creating a new game

router.post('/', async (request, response) => {
  const newGame = {
    name: request.body.name,
    category: request.body.category,
    releaseYear: request.body.releaseYear,
    rating: request.body.rating,
    hoursPlayed: request.body.hoursPlayed,
    notes: request.body.notes
  }
  
  try {
    if (
      !request.body.name ||
      !request.body.category ||
      !request.body.releaseYear
    ) {
      return response.status(400).send({
        message: 'Enter all required fields: Name, Category, Release Year'
      })
    }

    const game = await Game.create(newGame)
    return response.status(201).send(game)

  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})

// Route for getting all games from the database

router.get('/', async (request, response) => {
  try {
    const games = await Game.find({})

    return response.status(200).json({
      count: games.length,
      data: games
    })
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})

// Route for getting one game by id from the database

router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const game = await Game.findById(id)

    return response.status(200).json(game)

  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})

// Route for updating a game

router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.category ||
      !request.body.releaseYear
    ) {
      return response.status(400).send({
        message: 'Enter all required fields: Name, Category, Release Year'
      })
    }

    const { id } = request.params
    const result = await Game.findByIdAndUpdate(id, request.body)

    if (!result) {
      return response.status(404).json({ message: 'Game not found' })
    }

    return response.status(200).send({ message: 'Game updated successfully' })

  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})

// Route for deleting a game

router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const result = await Game.findByIdAndDelete(id)

    if (!result) {
      return response.status(404).json({ message: 'Game not found' })
    }

    return response.status(200).send({ message: 'Game deleted successfully' })

  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})

export default router