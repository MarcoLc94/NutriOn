import "./Video.css";
import MuxPlayer from "@mux/mux-player-react";

const Video = () => {
  return (
    <div className="video-container">
      <div className="video-card">
        <div className="video-content">
          <h3 className="video-tag">Únete a la Revolución Nutricional</h3>
          <hr />
          <p className="video-description">
            Descubre cómo NutriOn puede transformar tu relación con la comida y
            ayudarte a alcanzar tus metas de salud.
          </p>

          <div className="video-wrapper">
            <MuxPlayer
              playbackId=""
              src="/videos/marketingNutrion.mp4"
              metadata={{
                video_title: "NutriOn - Agent Video",
                viewer_user_id: "user-id-12345",
              }}
              primaryColor="#228B22"
              secondaryColor="#FFFFFF"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            />
          </div>

          <button
            className="video-cta"
            onClick={() => window.open("https://wa.me/528124493708", "_blank")}
          >
            ¡Quiero empezar!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Video;
