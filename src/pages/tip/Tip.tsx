import "./Tip.css";

const Tip = () => {
  return (
    <div className="tip-container">
      <div className="tip-card">
        <div className="tip-content">
          <h3 className="tip-tag">¿Qué es NutriOn?</h3>
          <hr />
          <div className="tips-mini">
            <p className="tip-text">
              NutriOn es nutrición personalizada, Transformamos planes, en
              comidas listas para comer con ingredientes frescos y todo el sabor
              que esperas. Lo que tu nutrióloga indique nosotros lo preparamos.
            </p>

            <p className="tip-text">
              Sin cocinar, sin complicarte, te damos el plan perfecto para comer
              bien y lograr tus metas
            </p>
          </div>
        </div>
        <div className="tip-image">
          <img
            src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
            alt="Comida saludable preparada"
            className="tip-img"
          />
        </div>
      </div>
    </div>
  );
};

export default Tip;
