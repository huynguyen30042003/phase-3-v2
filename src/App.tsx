import { useState,useEffect } from 'react'
import { Route,Routes } from 'react-router'
import StartGame from "./pages/StartGame/StartGame";
import CreateGame from "./pages/CreateGame/CreateGame";
import Question from "./pages/Question/Question";
import Result from "./pages/Result/Result";
import Winner from './pages/Winner/Winner';

export interface IState {
  list:{
    namePlayer?: string,
    answer?:string[],
    answerCorrect?:string[],
    score:number,
  }[]
}

function App() {
  // const [list, setList] = useState<IState["list"]>([])
  const [list,setList] = useState<IState["list"]>(JSON.parse(localStorage.getItem('list')) || [])

  const [phase, setPhase] = useState<number>(0)
  useEffect(()=>{
    localStorage.setItem("list",JSON.stringify(list))
    console.log(JSON.parse(localStorage.getItem("list")));
  },[list])
  return (
    <>
      <Routes>
        <Route path="/" element={<StartGame 
        ></StartGame>} />
        <Route path="/StartGame" element={<StartGame ></StartGame>} />
        <Route path="/CreateGame" element={<CreateGame
        list={list}
        setList={setList}
        ></CreateGame>} />
        <Route path="/Question" element={<Question
        list={list}
        setList={setList}
        phase={phase}
        setPhase={setPhase}
        ></Question>} />
        <Route path="/Result" element={<Result
        list={list}
        phase={phase}
        setPhase={setPhase}
        ></Result>} />
        <Route path="/Winner" element={<Winner
        list={list}
        phase={phase}

        ></Winner>} />
      </Routes>
    </>
  )
}

export default App
