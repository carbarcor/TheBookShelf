const express = require('express');
const axios = require('axios');
const router = express.Router();

// Route för att söka efter böcker
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
    if (error.response && error.response.status === 503) {
      console.error(error.response.statusText);
    } else {
      console.error('Error fetching books:', error);
    } 
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
    console.log('Book details:', bookDetails)

    // Dra ut det första ID:et ur arrayn "covers"
    const coverId = bookDetails.covers && bookDetails.covers.length > 0 ? bookDetails.covers[0] : null;

    // Hämta information om författare
    let authorDetails = []; // Tom array för att lagra information om författare
    if (bookDetails.authors && bookDetails.authors.length > 0) {
      authorDetails = await Promise.all(
        // Använd map över authors-arrayn för att skapa en lista över promises för varje författare
        bookDetails.authors.map(async author => {
          // API-request för att hämta info om varje författare baserat på author.key
          const authorRes = await axios.get(`https://openlibrary.org${author.author.key}.json`);
          // Extrahera och returnera författares namn
          return authorRes.data.name;
        })
      );
    }

    // Hämta utgivningsår via Search-API:et
    const searchResponse = await axios.get(`https://openlibrary.org/search.json?q=${encodeURIComponent(bookDetails.title)}&author=${encodeURIComponent(authorDetails.join(','))}`);
    // Filtrera sökresultat för att hitta boken som matchar id:et
    const searchResults = searchResponse.data.docs.filter(book => book.key === `/works/${id}`);
    // Extrahera utgivningsår från sökresultat
    const publishDetails = searchResults.length > 0 && searchResults[0].first_publish_year ? searchResults[0].first_publish_year : null;

    // Skicka tillbaka svaret som JSON
    res.json({
      ...bookDetails,
      author_names: authorDetails,
      first_published_year: publishDetails,
      cover_id: coverId
    })
  } catch (error) {
    // Logga eventuella fel och skicka ett felmeddelande till klienten
    if (error.response && error.response.status === 503) {
      console.error(error.response.statusText);
    } else {
      console.error('Error fetching book details:', error);
    } 
  }
});

module.exports = router;
