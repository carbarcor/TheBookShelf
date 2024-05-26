import React from 'react';
import '../styles/home.css';

export default function Home() {
  return (
    <div>
      <h1>The Book Shelf</h1>
      <div className="aboutUs">
        <h2>
          Välkommen till Bokhyllan – Din personliga boktjänst!
        </h2>
        <p>
          Upptäck, spara och recensera böcker på ett enkelt sätt. Med vår tjänst kan du:
        </p>
        <ul>
          <li>Söka efter dina favoritböcker och hitta nya spännande titlar</li>
          <li>Spara böcker till din personliga läslista</li>
          <li>Skriva recensioner om böcker du har läst</li>
          <li>Gilla eller ogilla andras recensioner</li>
        </ul>
        <p>
          Registrera dig gratis och logga in för att börja använda Bokhyllan idag. Gör läsningen till en delad upplevelse och hitta din nästa favoritbok hos oss!
        </p>
      </div>
    </div>
  );
}
