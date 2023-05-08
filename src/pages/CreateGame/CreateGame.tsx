import React from 'react'
import { IState as Props } from '../../App'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './CreateGame.scss'
import reject from '../../assets/img/reject.png'

interface IProps{
  list: Props['list']
  setList: React.Dispatch<React.SetStateAction<Props['list']>>;
  // count: Number;
  // setCount: React.Dispatch<React.SetStateAction<Number>>
}

function CreateGame({list,setList}:IProps) {
  const navigate=useNavigate()
  const [play1, setPlay1] = useState<string>('')
  const [play2, setPlay2] = useState<string>('')
  const StartGame = ()=>{
    if (list) {
      console.log(play1);
      console.log(play2);

      setList([{namePlayer: play1,score:0},{namePlayer:play2,score:0}])
      console.log(list);
      navigate(`/Question`)
    }
  }
  const onClick=()=>{
    navigate(`/`)
  }
  return (
    <div className='main'>
      <div className='inGame'>
        <div className='CreateGame'>
          <a>Create Game</a>
          <img
          onClick={onClick}
          src={reject}></img>
        </div>
        <div className='namePlayer'>
          <a>Player 1</a>
          <input name='namePlayer' onChange={(e)=>setPlay1(e.target.value)}></input>
        </div>
        <div className='namePlayer'>
          <a>Player 2</a>
          <input name='namePlayer' onChange={(e)=>setPlay2(e.target.value)}></input>
        </div>
        <button onClick={StartGame} >Start Game</button>
      </div>
    </div>
  )
}

export default CreateGame