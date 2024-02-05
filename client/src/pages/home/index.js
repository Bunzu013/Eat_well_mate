import React from "react";
import "./index.css";
import image from "../../assets/obraz1.jpg";
import { Link } from "react-router-dom";
import ksiazka from "../../assets/ksiazka.jpg";
import swiat from "../../assets/swiat.jpg";
import dania from "../../assets/dania.jpg";
const HomePage = () => {

  return (

    <div className="home-page">

      <section className="welcome">
        <div className="welcome_small">
          <h1>
            Witaj na stronie <span className="app-title">Eat Well Mate</span>!
          </h1>
          <p>Gdzie mozesz znaleźć przepisy na przepyszne dania</p>
        </div>


      </section>
      <section className="features">
        <h2>
          Szeroki wybór dla miłośników gotowania.
        </h2>
        <div className="possibilities">
          <div className="possibility-item">
            <h3 className="box-outline">Odkrywaj</h3>
            <img className="possibility-image" src={swiat} alt="world"></img>
            <p>
              Brak pomyslu co zjesc? Wylosuj jedno z dan z calego swiata.
            </p>
          </div>
          <div className="possibility-item">
            <h3 className="box-outline">Wyszukuj</h3>
            <img className="possibility-image" src={ksiazka} alt="book"></img>
            <p>
              Szukasz czegos konkretnego? Skorzystaj z filtrow!
            </p>
          </div>
          <div className="possibility-item">
            <h3 className="box-outline">Zapisuj</h3>
            <img className="possibility-image" src={dania} alt="dania"></img>
            <p>
              Po zalogowaniu, smialo zapisuj ulubione przepisy.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default HomePage;