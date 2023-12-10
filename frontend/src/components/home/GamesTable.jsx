import { Link } from 'react-router-dom'
import { FaTrash } from "react-icons/fa6";
import { FaPencil } from "react-icons/fa6";
import { FaCircleInfo } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import { FaSort } from "react-icons/fa6";
import { FaSortDown } from "react-icons/fa6";
import { FaSortUp } from "react-icons/fa6";

const GamesTable = ({ games }) => {
  const [sortedGames, setSortedGames] = useState([...games]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  // Sorting
  const sortGames = (field) => {
    let direction = 'ascending';
    if (sortConfig.key === field && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    const sorted = [...sortedGames].sort((a, b) => {
      if (a[field] < b[field]) return direction === 'ascending' ? -1 : 1;
      if (a[field] > b[field]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setSortedGames(sorted);
    setSortConfig({ key: field, direction: direction });
  };

  useEffect(() => {
    setSortedGames([...games])
  }, [games])

  return (
    <div style={{ width: '75%', border: '10px solid #cff4fc', borderRadius: '10px' }}>
      <div className='table-responsive'>
        <table className='table table-hover align-middle text-center table-borderless'
          style={{ marginBottom: '0' }}>
          <thead>
            <tr>
              <th className='col table-info align-middle'>#</th>
              <th className='col table-info align-middle'
                onClick={() => sortGames('name')}>Name {sortConfig.key === 'name' ? (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />) : <FaSort />}
              </th>
              <th className='col table-info align-middle'
                onClick={() => sortGames('category')}>Category {sortConfig.key === 'category' ? (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />) : <FaSort />}
              </th>
              <th className='col table-info align-middle'
                onClick={() => sortGames('releaseYear')}>Release Year {sortConfig.key === 'releaseYear' ? (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />) : <FaSort />}
              </th>
              <th className='col table-info align-middle'
                onClick={() => sortGames('hoursPlayed')}>Hours Played {sortConfig.key === 'hoursPlayed' ? (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />) : <FaSort />}
              </th>
              <th className='col table-info align-middle'
                onClick={() => sortGames('rating')}>Rating {sortConfig.key === 'rating' ? (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />) : <FaSort />}
              </th>
              <th className='col table-info align-middle'>Actions</th>
            </tr>
          </thead>
          <tbody className='table-group-divider'>
            {sortedGames.map((game, index) => (
              <tr key={game._id} className='h-8'>
                <td className='col-1 table-light'>
                  {index + 1}
                </td>
                <td className='col-md-auto table-light'>
                  {game.name}
                </td>
                <td className='col-md-auto table-light'>
                  {game.category}
                </td>
                <td className='col-md-auto table-light'>
                  {game.releaseYear}
                </td>
                <td className='col-md-auto table-light'>
                  {game.hoursPlayed ? `${game.hoursPlayed}` : '-'}
                </td>
                <td className='col-md-auto table-light'>
                  {game.rating ? `${game.rating}/10` : '-'}
                </td>
                <td className='col-1 table-light'>
                  <div className='d-flex gap-3'>
                    <Link to={`/games/details/${game._id}`}>
                      <FaCircleInfo className='text-primary fs-4' />
                    </Link>
                    <Link to={`/games/edit/${game._id}`}>
                      <FaPencil className='text-warning fs-4' />
                    </Link>
                    <Link to={`/games/delete/${game._id}`}>
                      <FaTrash className='text-danger fs-4' />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default GamesTable