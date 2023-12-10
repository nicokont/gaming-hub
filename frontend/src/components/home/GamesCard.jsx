import GamesSingleCard from "./GamesSingleCard"

const GamesCard = ({ games }) => {

  return (
    <div className="d-flex justify-content-center">
      <div className="container d-flex flex-wrap justify-content-center">
        {games.map((item) => (
          <GamesSingleCard key={item._id} game={item} />
        ))}
      </div>
    </div>
  )
}

export default GamesCard