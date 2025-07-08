
import Button from "../../components/CustomButton/CustomButton"
import Tip from "../tip/Tip"
import "./Inicio.css"


const Inicio = () => {

 

  return (
    <div className="main-container" id="home">
    <div className="inicio-container" >
      <div className="title-div">
        <span className="title">NutriOn</span>
        <small className="slogan">A project for you</small>
      </div>
      <div className="button-div">
       <Button className="button--success button--shadow-small button--rounded-large" style={{width: '15vw', height: '8vh',fontSize: '1.8rem'}}>Quiero mi plan</Button>
      </div>
    </div>
    <Tip></Tip>
    </div>
  )
}

export default Inicio