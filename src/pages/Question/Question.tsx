import React from 'react';
import { IState as Props } from '../../App';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import './Question.scss'

interface IProps {
  list: Props['list'];
  setList: React.Dispatch<React.SetStateAction<Props['list']>>;
  setPhase: React.Dispatch<React.SetStateAction<number>>;
  phase: number
}
function Question({list,setList,phase,setPhase}:IProps){
  const navigate=useNavigate()
  const [check, setCheck] = useState<boolean>(true);
  const [ansA, setAnsA] = useState<string[]>([])
  const [ansB, setAnsB] = useState<string[]>([])  
  const [ansACorrect, setAnsACorrect] = useState<string[]>([])
  const [ansBCorrect, setAnsBCorrect] = useState<string[]>([])
  const [ans, setAns] = useState<string>("empty")
  const [data, setData] = useState<any>("");
  const [ansCorrect, setAnsCorrect] = useState<string>("")
  const [pointA, setPointA] = useState<number>(0)
  const [pointB, setPointB] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [ansHash, setAnsHash] = useState<Number[]>([1,2,3,4])
  const [forTurn, setForTurn] = useState<Number>(1)
  const [countDown, setCountDown] = useState<number>(10)
  const ABCD:string[]=["A","B","C","D"]
  const call=()=>{
    setIsLoading(false)
    const fetchData = async () => {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=1&type=multiple"
      );
      const jsonData = await response.json();
      setData(jsonData.results[0]);
      console.log(jsonData.results);
      const results = await jsonData.results[0];
      console.log(results);
        let a=Math.floor(Math.random() * 3)   
        console.log(a);
        console.log(ABCD[a]);
        console.log(Number(forTurn) % 2);
        setAnsCorrect(ABCD[a])
        if (Number(forTurn) % 2!=0) {
          console.log("a");
          setAnsACorrect([...ansACorrect,ABCD[a]])
          console.log(ansACorrect);
        }else{
          console.log("b");
          setAnsBCorrect([...ansBCorrect,ABCD[a]])
          console.log(ansBCorrect);
        }
        let count=0
        const newHash:(any | undefined)[] = ansHash.map((item,index)=>{
          if(index==a){
            return 3
          }else{  
            return count++;
          }
        })
        setAnsHash(newHash);
      setIsLoading(true)
    };
    if (check) {
      fetchData();
      setForTurn(Number(forTurn)+1);
    }
  }
  useEffect(() => {
    call()
}, [])
  const nextRound =()=>{
    call()
    if (Number(forTurn) % 2==0) {
      setAnsA([...ansA,ans])
      if (ans==ansCorrect) {
        setPointA(pointA+1)
      }
    }else{
      setAnsB([...ansB,ans])
      if (ans==ansCorrect) {
        setPointB(pointB+1)
      }
    }
    if (forTurn!=7&&forTurn!=15) {
      setIsLoading(false)
      navigate(`/Question`)
    }else{
      const newList = list.map((item,index)=>{
        if (index==0) {
          return {
            ...item,answer:ansA,answerCorrect:ansACorrect,score:pointA
          }
        }else{
          return {
            ...item,answer:[...ansB,ans],answerCorrect:ansBCorrect,score:pointB
          }
        }
      })
      setList(newList)
      setPhase(phase+1)
      navigate('/Result')
    }
  }
  let All_answer:String[]=[''];
  if (data.incorrect_answers){
    const AllAnswer=ansHash.map((item)=>{
      if(item==3){

        return data.correct_answer
      }else{
        return data.incorrect_answers[Number(item)]
      }
    })
    All_answer=AllAnswer;
  }
  const chooseAns=(index:Number)=>{
    console.log(index);
    console.log(ABCD[Number(index)]);
    setAns(ABCD[Number(index)])
    console.log(ans);
  }

console.log(isLoading);
    if (isLoading===true) {
    return (
      <div className='main'>
        <div className='inGame'>
          <a className='turnPLayer'>
          turn {list[Number(forTurn) % 2 ].namePlayer}  
          </a>
          <div className='question'>
          {data.question}

          </div>

      <div className='answer'>
      {
          All_answer.map((item,index)=>(
            <button
            onClick={()=>chooseAns(index)}
            >
              <a>{ABCD[index]}: {item}</a>
            </button>
          ))
          // <div className='answer'>
          // <a>A</a>
          // </div>
        }
      </div>
      <button
        onClick={nextRound} 
        > {forTurn!=7?"Submit":"Result"}
        {countDown}
        </button>
      </div>
      </div>
    )
    }else{
      return (
        <div className='main'>
        <div className='inGame'>
        <a className='loading'>loading</a>
        </div>
        </div>
      )
    }
  }

export default Question;