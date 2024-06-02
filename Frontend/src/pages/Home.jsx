import React from 'react';
import '../styles/home.css';

// Sida för visning av startsida
export default function Home() {
  return (
    <div>

      <div className="aboutUs">
      <h1>The Book Shelf</h1>
        <h2>Välkommen till The Book Shelf – Din plats för bokrecensioner!</h2>
        <p>Upptäck, läs och dela dina åsikter om böcker. Med vår tjänst kan du:</p>
        <ul>
          <li>Skriva och dela recensioner om böcker du har läst</li>
          <li>Läsa andras recensioner och hitta nya spännande titlar</li>
          <li>Gilla eller ogilla recensioner för att hitta de bästa tipsen</li>
        </ul>
        <p>Registrera dig gratis och logga in för att börja använda The Book Shelf idag. </p>
        <p>Gör läsupplevelsen till en delad resa och hitta din nästa favoritbok hos oss!</p>
      </div>
    </div>
  );
}
