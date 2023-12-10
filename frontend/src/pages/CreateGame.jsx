import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FaCirclePlus } from "react-icons/fa6"

const CreateGame = () => {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [releaseYear, setReleaseYear] = useState('')
  const [rating, setRating] = useState('')
  const [hoursPlayed, setHoursPlayed] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleSaveGame = () => {
    const data = { name, category, releaseYear, rating, hoursPlayed, notes }
    setLoading(true)
    axios
      .post('http://localhost:3000/games', data)
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
      <h1 className='fs-3 my-4 text-center'>Add new game</h1>
      {loading ? <Spinner /> : ''}
      <div className='d-flex align-items-center flex-column border border-4 border-success rounded-5 p-4'
        style={{ maxWidth: '500px', width: '100%' }}>
        <div className='d-flex flex-column my-4 justify-content-between' style={{ width: '75%' }}>
          <label className='fs-5 me-4'>Name<span className='text-danger'>*</span></label>
          <input
            type='text'
            maxLength={30}
            placeholder='30 characters max'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border border-2 border-success px-2 py-2 rounded form-control'
          />
        </div>
        <div className='d-flex flex-column justify-content-between' style={{ width: '75%' }}>
          <label className='fs-5 me-4'>Category<span className='text-danger'>*</span></label>
          <input
            type='text'
            maxLength={30}
            placeholder='30 characters max'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='border border-2 border-success px-2 py-2 rounded form-control'
          />
        </div>
        <div className='d-flex justify-content-between' style={{ width: '75%' }}>
          <div className='d-flex flex-column my-4 justify-content-between' >
            <label className='fs-5 me-4'>Release Year<span className='text-danger'>*</span></label>
            <input
              type='number'
              min="1950"
              max="2050"
              placeholder='1950-2050'
              value={releaseYear}
              onChange={(e) => setReleaseYear(e.target.value)}
              className='border border-2 border-success px-2 py-2 rounded form-control'
            />
          </div>
          <div className='d-flex flex-column my-4 justify-content-between'>
            <label className='fs-5 me-4'>Hours Played</label>
            <input
              type='number'
              min="1"
              max="9999"
              placeholder='1-10000'
              value={hoursPlayed}
              onChange={(e) => setHoursPlayed(e.target.value)}
              className='border border-2 border-success px-2 py-2 rounded form-control'
            />
          </div>
        </div>
        <div className='d-flex flex-column justify-content-between' style={{ width: '75%' }}>
          <label className='fs-5 me-4'>Rating</label>
          <div className='input-group'>
            <input
              type='number'
              min="1"
              max="10"
              placeholder='1-10'
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className='border border-2 border-success px-2 py-2 rounded form-control'
            />
            <span className='input-group-text'>/ 10</span>
          </div>
        </div>
        <div className='d-flex flex-column my-4 justify-content-between' style={{ width: '75%' }}>
          <label className='fs-5 me-4'>Notes</label>
          <textarea
            type='text'
            placeholder='Write your notes about the game here!'
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className='border border-2 border-success px-2 py-2 rounded form-control'
          />
        </div>
        <button className='btn btn-success btn-lg rounded-pill my-4 d-flex align-items-center justify-content-center'
          style={{ width: '200px' }}
          onClick={handleSaveGame}>
          <FaCirclePlus className='fs-2 mx-2' />
          <span className='mx-2'>Add game</span>
        </button>
      </div>
    </div>
  )
}

export default CreateGame