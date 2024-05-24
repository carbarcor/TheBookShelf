import './App.css';// Importerar CSS-filen för att tillämpa stilar på applikationen
import { Routes, Route } from 'react-router-dom'; // Importerar Routes och Route från react-router-dom för att hantera routing
import Navbar from './components/Navbar';// Importerar Navbar-komponenten
import Home from './pages/Home';// Importerar Home-sidan
import Signup from './pages/Signup';// Importerar Signup-sidan
import Login from './pages/Login';// Importerar Login-sidan
import axios from 'axios'; // Importerar axios för att skicka HTTP-förfrågningar
import { UserContextProvider } from '../Shelf/userShelf'; // Importerar UserContextProvider för att hantera användarkontext
import Dashboard from './pages/Dashboard'; // Importerar Dashboard-sidan
import BookDetails from './pages/BookDetails';// Importerar BookDetails-komponenten

// Ställ in bas-URL och credentials för axios
axios.defaults.baseURL = 'http://localhost:8000';// Ställer in bas-URL för axios-förfrågningar
axios.defaults.withCredentials = true // Tillåter att skicka cookies med förfrågningar

function App() {
return (
  // Omsluter hela applikationen med UserContextProvider för att hantera användarkontext
  <UserContextProvider>  
    <Navbar /> 
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path="/book/:bookId" element={<BookDetails />} />
    </Routes>
  </UserContextProvider>
  )
}

export default App // Exporterar App-komponenten som standard
