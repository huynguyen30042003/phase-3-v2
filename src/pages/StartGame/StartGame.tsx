import { useNavigate } from "react-router"
import './StartGame.scss'

function StartGame() {
  const navigate=useNavigate();
  const createGame=()=>{
    navigate('/CreateGame')
  }
  return (
    <div className="main">
      <div className="inGame">
        <a>Funny Game</a>
        <button onClick={createGame}>Start Game </button>
      </div>
    </div>
  )
}

export default StartGame