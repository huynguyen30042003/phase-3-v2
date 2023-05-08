import { IState as Props } from '../../App'
import { useNavigate } from "react-router-dom";

interface IProps{
  list: Props['list']
  phase: number
}
function Winner({list,phase}:IProps) {
    const nav=useNavigate()
    const onClick=()=>{
        if(phase==1){
            nav(`/Question`)
        }else{
            nav(`/`)
        }

    }
  return (
    <>
    <div>Winner is {list[0].score>list[1].score?"a win":""} {list[0].score<list[1].score?"b win":""} {list[0].score==list[1].score?"drawn":""}</div>
    <button onClick={onClick}>{phase==1?"next phase":"play again"}</button>
    </>

  )
}
export default Winner