import Button from "../../components/CustomButton/CustomButton"
import "./Inicio.css"

const Inicio = () => {
  return (
    <div className="inicio-container">
      <div className="title">NutriOn</div>
      <small className="slogan">A project for you</small>
      <div className="button-div">
       <Button className="button--success button--shadow-small">Quiero mi plan</Button>
      </div>
    </div>
  )
}

export default Inicio