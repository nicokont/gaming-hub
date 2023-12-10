import React, { useState, useEffect } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { FaTrash } from "react-icons/fa6";

const DeleteGame = () => {
  const [loading, setLoading] = useState(false)
  const [game, setGame] = useState(null)
  const navigate = useNavigate()
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

  const handleDeleteBook = () => {
    setLoading(true)
    axios
      .delete(`http://localhost:3000/games/${id}`)
      .then(() => {
        setLoading(false)
        navigate('/')
      })
      .catch((error) => {
        setLoading(false)
        alert('An error occurred.')
        console.log(error)
      })
  }

  return (
    <div className='d-flex align-items-center flex-column p-5'>
      <BackButton />
      <h1 className='fs-3 my-4 text-center'>{game ? `Delete ${game.name}` : 'Delete'}</h1>
      {loading ? <Spinner /> : ''}
      <div className='d-flex align-items-center flex-column border border-4 border-danger rounded-5 p-4'
        style={{ width: '500px' }}>
        <h3 className='fs-5 my-4 text-center'>Are you sure?</h3>
        <button className='btn btn-danger btn-lg rounded-pill my-4 d-flex align-items-center justify-content-center'
          style={{ width: '200px' }}
          onClick={handleDeleteBook}>
          <FaTrash className='fs-2 mx-2' />
          <span className='mx-2'>Yes</span>
        </button>
      </div>
    </div>
  )
}

export default DeleteGame