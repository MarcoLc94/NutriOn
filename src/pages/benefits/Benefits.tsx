import "./Benefits.css";

const Benefits = () => {
  return (
    <div className="benefits-container">
      <div className="benefits-card">
        <div className="benefits-image">
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
            alt="Comida saludable variada"
            className="benefits-img"
          />
        </div>
        <div className="benefits-content">
          <h3 className="benefits-tag">Beneficios NutriOn</h3>
          <hr />
          <div className="benefits-list">
            <div className="benefit-item">
              <h4 className="benefit-title">Comida Personalizada</h4>
              <p className="benefit-text">
                Preparada exactamente según las indicaciones de tu nutriólogo,
                con los ingredientes y porciones que necesitas.
              </p>
            </div>

            <div className="benefit-item">
              <h4 className="benefit-title">Ahorro de Tiempo</h4>
              <p className="benefit-text">
                Sin compras, sin cocinar, sin limpieza. Más tiempo para lo que
                realmente importa.
              </p>
            </div>

            <div className="benefit-item">
              <h4 className="benefit-title">Ingredientes Frescos</h4>
              <p className="benefit-text">
                Seleccionamos los mejores productos locales para garantizar
                calidad y sabor.
              </p>
            </div>

            <div className="benefit-item">
              <h4 className="benefit-title">Flexibilidad</h4>
              <p className="benefit-text">
                Planes adaptables a tus cambios y evolución. Ajustamos cuando lo
                necesites.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
