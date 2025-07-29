import "./How.css";

const How = () => {
  return (
    <div className="how-container">
      <div className="how-card">
        <div className="how-content">
          <h3 className="how-tag">¿Cómo funciona NutriOn?</h3>
          <hr />
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4 className="step-title">Consulta con tu nutriólogo</h4>
                <p className="step-text">
                  Obtén tu plan nutricional personalizado de un profesional de
                  la salud.
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4 className="step-title">Envíanos tu plan</h4>
                <p className="step-text">
                  Compártenos las indicaciones de tu nutriólogo por WhatsApp o
                  correo electrónico.
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4 className="step-title">Preparamos tus comidas</h4>
                <p className="step-text">
                  Nuestros chefs transforman las indicaciones en deliciosas
                  comidas listas para comer.
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4 className="step-title">Recibe y disfruta</h4>
                <p className="step-text">
                  Te entregamos tus comidas semanales, listas para calentar y
                  disfrutar.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="how-image">
          <img
            src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
            alt="Chef preparando comida saludable"
            className="how-img"
          />
        </div>
      </div>
    </div>
  );
};

export default How;
