import { Link } from "react-router-dom"
import { FaTrash } from "react-icons/fa6";
import { FaPencil } from "react-icons/fa6";
import { FaCircleInfo } from "react-icons/fa6";
import { IoGameController } from "react-icons/io5";
import { MdCategory } from "react-icons/md";
import { FaCalendarDays } from "react-icons/fa6";
import { FaClock } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";

const GamesSingleCard = ({ game }) => {

  return (
    <div key={game._id} className="d-flex flex-column border border-4 border-info p-4 rounded bg-light m-2" style={{ width: '400px' }}>
      <div className="d-flex gap-2 align-items-center justify-content-center p-2">
        <IoGameController className='fs-3 mx-1' />
        <span className="my-1 fs-2 fw-bold">{game.name}</span>
      </div>
      <div className="d-flex gap-2 align-items-center justify-content-center p-2">
        <MdCategory className='fs-3 mx-1' />
        <h2 className="my-1 fs-5 fw-normal">{game.category}</h2>
      </div>
      <div className="d-flex gap-2 align-items-center justify-content-center p-2">
        <FaCalendarDays className='fs-3 mx-1' />
        <h2 className="my-1 fs-5 fw-normal">{game.releaseYear}</h2>
      </div>
      {game.hoursPlayed ? (
        <div className="d-flex gap-2 align-items-center justify-content-center p-2">
          <FaClock className='fs-3 mx-1' />
          <h2 className="my-1 fs-5 fw-normal">{game.hoursPlayed} hours</h2>
        </div>
      ) : null}
      {game.rating ? (
        <div className="d-flex gap-2 align-items-center justify-content-center p-2">
          <FaStar className='fs-3 mx-1' />
          <h2 className="my-1 fs-5 fw-normal">{game.rating}/10</h2>
        </div>
      ) : null}
      <div className="d-flex align-items-bottom justify-content-between gap-2 mt-auto p-4">
        <Link to={`games/details/${game._id}`}>
          <FaCircleInfo className="fs-2 text-primary" />
        </Link>
        <Link to={`games/edit/${game._id}`}>
          <FaPencil className="fs-2 text-warning" />
        </Link>
        <Link to={`games/delete/${game._id}`}>
          <FaTrash className="fs-2 text-danger" />
        </Link>
      </div>
    </div>
  )
}

export default GamesSingleCard