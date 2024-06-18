import React, { useState, useEffect } from 'react';
import { Container, Grid, Box } from '@mui/material';
import { useLazyQuery } from '@apollo/client';
import { BOOKS_QUERY } from './queries';
import BookSearch from './components/BookSearch';
import ReadingList from './components/ReadingList';
import NavBar from './components/NavBar';
import { Helmet } from 'react-helmet'; // Import react-helmet

const App = () => {
  const [readingList, setReadingList] = useState([]);
  const [initialBooks, setInitialBooks] = useState([]);

  const [fetchInitialBooks] = useLazyQuery(BOOKS_QUERY, {
    onCompleted: (data) => {
      setInitialBooks(data.books);
      console.log('Initial books fetched:', data.books);
    },
    onError: (error) => {
      console.error('Error fetching initial books:', error);
    },
  });

  // Fetch books on component mount
  useEffect(() => {
    fetchInitialBooks({ variables: { title: '' } });
  }, [fetchInitialBooks]);

  // Load reading list from local storage on component mount
  useEffect(() => {
    const storedReadingList = localStorage.getItem('readingList');
    if (storedReadingList) {
      setReadingList(JSON.parse(storedReadingList));
    }
  }, []);

  // Save reading list to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('readingList', JSON.stringify(readingList));
  }, [readingList]);

  const addToReadingList = (book) => {
    const isAlreadyAdded = readingList.some((item) => item.title === book.title);
    if (!isAlreadyAdded) {
      setReadingList([...readingList, book]);
    }
  };

  const removeFromReadingList = (bookToRemove) => {
    setReadingList((prevList) =>
      prevList.filter((book) => book.title !== bookToRemove.title)
    );
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Helmet>
        <title>Teacher's Portal</title> {/* Set the title */}
      </Helmet>
      <NavBar />
      <Container maxWidth="lg" sx={{ flexGrow: 1, ml: 0 }}> {/* Adjust ml value if necessary */}
        <Box sx={{ mb: 1 }}>
          {/* Remove the Typography component for "Ello" */}
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <BookSearch addToReadingList={addToReadingList} initialBooks={initialBooks} />
            </Grid>
            <Grid item xs={12} md={4}>
              <ReadingList
                readingList={readingList}
                removeFromReadingList={removeFromReadingList}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default App;
