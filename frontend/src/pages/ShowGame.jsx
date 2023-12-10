import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import { FaTrash } from "react-icons/fa6";
import { FaPencil } from "react-icons/fa6";

const ShowGame = () => {
  const [game, setGame] = useState({})
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    axios.get(`http://localhost:3000/games/${id}`)
      .then(response => {
        setGame(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [id])

  useEffect(() => {
    setLoading(true)
    axios
      .get(`http://localhost:3000/games/${id}`)
      .then((response) => {
        setGame(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }, [])

  return (
    <div className='d-flex align-items-center flex-column p-5'>
      <BackButton />
      <h1 className='fs-3 my-4 text-center'>{game ? `Details of ${game.name}` : 'Details of'}</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='d-flex align-items-center flex-column border border-4 border-primary rounded-5 p-4'
          style={{ maxWidth: '500px', width: '100%' }}>
          <div className='d-flex align-items-center my-4 justify-content-between border-bottom border-primary border-2' style={{ width: '75%' }}>
            <span className='fs-5 me-4'>Name</span>
            <span>{game.name}</span>
          </div>
          <div className='d-flex align-items-center my-4 justify-content-between border-bottom border-primary border-2' style={{ width: '75%' }}>
            <span className='fs-5 me-4'>Category</span>
            <span>{game.category}</span>
          </div>
          <div className='d-flex align-items-center my-4 justify-content-between border-bottom border-primary border-2' style={{ width: '75%' }}>
            <span className='fs-5 me-4'>Release Year</span>
            <span>{game.releaseYear}</span>
          </div>
          {game.hoursPlayed && (
            <div className='d-flex align-items-center my-4 justify-content-between border-bottom border-primary border-2' style={{ width: '75%' }}>
            <span className='fs-5 me-4'>Hours Played</span>
            <span>{game.hoursPlayed}</span>
          </div>
          )}
          {game.rating && (
            <div className='d-flex align-items-center my-4 justify-content-between border-bottom border-primary border-2' style={{ width: '75%' }}>
            <span className='fs-5 me-4'>Rating</span>
            <span>{game.rating}/10</span>
          </div>
          )}
          {game.notes && (
            <div className='d-flex align-items-center mt-4 justify-content-between border-bottom border-primary border-2' style={{ width: '75%' }}>
              <span className='fs-5 me-4'>Notes</span>
            </div>
          )}
          <div className='d-flex align-items-center mt-2 justify-content-between' style={{ width: '75%' }}>
            <span>{game.notes}</span>
          </div>
          <div className='d-flex my-4 gap-5'>
            <Link to={`/games/edit/${game._id}`}>
              <FaPencil className='text-warning fs-2' />
            </Link>
            <Link to={`/games/delete/${game._id}`}>
              <FaTrash className='text-danger fs-2' />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowGame