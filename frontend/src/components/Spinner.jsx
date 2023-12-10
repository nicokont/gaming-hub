import React from 'react'

const Spinner = () => {
  return (
    <div className="d-flex align-items-center">
      <div className="spinner-border mx-2" aria-hidden="true"></div>
      <strong role="status">Loading...</strong>
    </div>
  )
}

export default Spinner