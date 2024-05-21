const jwt = require('jsonwebtoken');// Importerar jsonwebtoken för att verifiera JWT

// Middleware-funktion för att autentisera JWT
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;// Hämta token från cookies

  // Om ingen token finns, skicka ett felmeddelande
  if (!token) {
    return res.status(401).json({ error: 'Access Denied, No Token Provided' });
  }

  try {
     // Verifiera token med hjälp av JWT-hemligheten
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;// Sätt den dekodade användarinformationen i request-objektet
    next();// Fortsätt till nästa middleware eller route-handler
  } catch (err) {
    // Om verifieringen misslyckas, skicka ett felmeddelande
    res.status(400).json({ error: 'Invalid token' });
  }
};

module.exports = authenticateToken; // Exporterar middleware-funktionen
