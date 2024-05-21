import axios from 'axios';// Importerar axios för att skicka HTTP-förfrågningar
import { createContext, useState, useEffect } from 'react';// Importerar nödvändiga hooks och funktioner från React

// Skapar en kontext för användardata
export const UserContext = createContext({});

// Skapar en Provider-komponent för UserContext
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);// Tillstånd för att lagra användarens data

  // useEffect för att hämta användarens profil vid komponentens montering
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Skicka en GET-förfrågan till /profile endpoint för att hämta användarens data
        const { data } = await axios.get('/profile', { withCredentials: true });
        setUser(data);// Sätt användardatan i tillståndet
      } catch (error) {
        console.error('Error fetching user profile:', error);// Logga eventuella fel
      }
    };

    fetchUser(); // Anropa fetchUser-funktionen
  }, []); // Den tomma beroende-arrayen säkerställer att effekten bara körs en gång vid montering

  return (
    // Tillhandahåller användardata och setUser-funktionen till alla barnkomponenter
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
