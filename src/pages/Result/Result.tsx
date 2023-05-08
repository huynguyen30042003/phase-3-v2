import { IState as Props } from '../../App';
import React from 'react'
import { Input,Table } from 'antd';
import { useNavigate } from 'react-router';


interface IProps {
  list: Props['list'];
  phase: number;
  setPhase: React.Dispatch<React.SetStateAction<number>>
}
function Result({list,phase,setPhase}:IProps) {
  const navigate=useNavigate()
  console.log(list);
  console.log(phase);
  
  const columns = [
    {
      key:"1",
      title:'player',
      dataIndex:'namePlayer',
    },
    {
      key:"2",
      title:'Answer',
      dataIndex:'answer',
    },
    {
      key:"3",
      title:'Result',
      dataIndex:'answerCorrect',
    },
    {
      key:"4",
      title:'Score',
      dataIndex:'score',
    },
  ]
  const onclick=()=>{
      navigate(`/Winner`)

  }
  return (
    <>
      <div >Result Game</div>
      <Table
        columns={columns}
        dataSource={list}
      ></Table>
      <button onClick={onclick}>result</button>
    </>
  )
}

export default Result