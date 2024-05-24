const express = require('express');
const axios = require('axios');
const router = express.Router();

//Route för att söka efter böcker
router.get('/search', async (req, res) => {
// Destrukturera query-parametrar och sätt ett standardvärde på limit till 5
  const { q, author, title, isbn, limit = 5 } = req.query; 

  // Skapa en array för att bygga upp query-strängen
  const query = [];
  if (q) query.push(`q=${q}`);
  if (author) query.push(`author=${author}`);
  if (title) query.push(`title=${title}`);
  if (isbn) query.push(`isbn=${isbn}`);
  query.push(`limit=${limit}`);

  // Sammanfoga query-parametrarna till en sträng
  const queryString = query.join('&');

  try {
    // Skicka en GET-förfrågan till Open Library API med den byggda query-strängen
    const response = await axios.get(`https://openlibrary.org/search.json?${queryString}`);
    const books = response.data.docs.map(book => ({
      key: book.key,
      title: book.title,
      author_name: book.author_name,
      first_publish_year: book.first_publish_year,
      cover_id: book.cover_i
    }));
    // Skicka tillbaka svaret som JSON
    res.json({ docs: books })
  } catch (error) {
    // Logga eventuella fel och skicka ett felmeddelande till klienten
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Error fetching books' });
  }
});

// Route för att hämta detaljer om en specifik bok
router.get('/book/:id', async (req, res) => {
   // Hämta bok-ID från URL-parametrarna  
  const { id } = req.params;

  try {
    // Skicka en GET-förfrågan till Open Library API för att hämta bokdetaljer
    const response = await axios.get(`https://openlibrary.org/works/${id}.json`);
    const bookDetails = response.data;
    console.log(bookDetails)

    // Dra ut det första ID:et ur arrayn "covers"
    const coverId = bookDetails.covers && bookDetails.covers.length > 0 ? bookDetails.covers[0] : null;

    console.log('Cover id:', coverId)
    // Skicka tillbaka svaret som JSON
    res.json({
      ...bookDetails,
      cover_id: coverId
    })
  } catch (error) {
    // Logga eventuella fel och skicka ett felmeddelande till klienten
    console.error('Error fetching book details:', error);
    res.status(500).json({ error: 'Error fetching book details' });
  }
});

module.exports = router;
