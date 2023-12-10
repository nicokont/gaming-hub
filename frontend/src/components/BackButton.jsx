import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa6";

const BackButton = ({ destination = '/' }) => {
  return (
    <div className='d-flex'>
      <Link to={destination} className='btn btn-dark rounded-pill'>
        <FaArrowLeft className='fs-2' />
      </Link>
    </div>
  )
}

export default BackButton