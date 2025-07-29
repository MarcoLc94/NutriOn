import Button from "../../components/CustomButton/CustomButton";
import Benefits from "../benefits/Benefits";
import How from "../how/How";
import Testimonials from "../testimonials/Testimonials";
import Tip from "../tip/Tip";
import Video from "../video/Video";
import "./Inicio.css";

const Inicio = () => {
  return (
    <div className="main-container" id="home">
      <div className="inicio-container">
        <div className="title-div">
          <span className="title">NutriOn</span>
          <small className="slogan">A project for you</small>
        </div>
        <div className="button-div">
          <a href="https://wa.me/528124493708" target="_blank">
            <Button className="button--success button--shadow-small button--rounded-large">
              Quiero mi plan
            </Button>
          </a>
        </div>
      </div>
      <Tip></Tip>

      <Benefits></Benefits>

      <How></How>

      <Video></Video>

      <Testimonials></Testimonials>
    </div>
  );
};

export default Inicio;
