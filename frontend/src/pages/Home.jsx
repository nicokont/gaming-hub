import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import GamesCard from '../components/home/GamesCard'
import GamesTable from '../components/home/GamesTable'
import { FaCirclePlus } from "react-icons/fa6";
import { IoGameController } from "react-icons/io5";
import { FaListUl } from "react-icons/fa6";
import { FaTableCells } from "react-icons/fa6";
import { Dropdown, DropdownButton } from 'react-bootstrap'

const Home = () => {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [showType, setShowType] = useState('table')
  const [searchField, setSearchField] = useState('name')

  const filteredGames = games.filter(game => {
    const field = game[searchField];
    if (field) {
      return field.toString().toLowerCase().includes(search.toLowerCase());
    }
    return false;
  });

  const fields = {
    name: 'Name',
    category: 'Category',
    releaseYear: 'Release Year',
    hoursPlayed: 'Hours Played',
    rating: 'Rating'
  };

  useEffect(() => {
    setLoading(true)
    axios.get('http://localhost:3000/games')
      .then((response) => {
        setGames(response.data.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }, [])

  return (
    <div className='d-flex align-items-center flex-column p-4'>
      <div className='d-flex align-items-center flex-column'>
        <IoGameController className='fs-1' />
        <h1>Gaming Hub</h1>
      </div>
      <div className='d-flex align-items-center flex-row'>
        <button className='btn btn-secondary btn-lg rounded-pill d-flex align-items-center justify-content-center mx-2'
          style={{ width: '150px' }}
          onClick={() => setShowType('table')}>
          <FaListUl className='fs-2 mx-2' />
          <span className='mx-2'>List</span>
        </button>
        <button className='btn btn-secondary btn-lg rounded-pill d-flex align-items-center justify-content-center mx-2'
          style={{ width: '150px' }}
          onClick={() => setShowType('card')}>
          <FaTableCells className='fs-2 mx-2' />
          <span className='mx-2'>Card</span>
        </button>
      </div>
      <div>
        <Link to='/games/create' style={{ textDecoration: 'none' }}>
          <button className='btn btn-success btn-lg rounded-pill my-2 d-flex align-items-center justify-content-center'
            style={{ width: '150px' }}>
            <FaCirclePlus className='fs-2 mx-2' />
            <span className='mx-2'>Add</span>
          </button>
        </Link>
      </div>

      <div className='input-group mb-3' style={{ width: '50%', maxWidth: '500px' }}>
        <div className='rounded-pill mx-2' style={{ overflow: 'hidden' }}>
          <DropdownButton size="lg" id='dropdown-basic-button' title={fields[searchField]} style={{ position: 'static' }}>
            {Object.keys(fields).map(field => (
              <Dropdown.Item key={field} onClick={() => setSearchField(field)}>
                {fields[field]}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </div>
        <input type='text' className='form-control border-primary border-3 rounded-pill' placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {loading ? <Spinner /> : filteredGames.length === 0 ? <p className='fs-2 fw-bold my-5'>No games found</p> : showType === 'table' ? (<GamesTable games={filteredGames} />) : (<GamesCard games={filteredGames} />)}
    </div>
  )
}

export default Home