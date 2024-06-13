import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import BookSearch from './components/BookSearch';
import ReadingList from './components/ReadingList';
import { useLazyQuery } from '@apollo/client';
import { BOOKS_QUERY } from './queries';

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

  useEffect(() => {
    // Fetch initial set of books on component mount
    fetchInitialBooks({ variables: { title: '' } });
  }, [fetchInitialBooks]);

  const addToReadingList = (book) => {
    // Check if the book is already present in the reading list
    const isAlreadyAdded = readingList.some((item) => item.title === book.title);
  
    // If the book is not already added, add it to the reading list
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
    <Container maxWidth="lg">
      {/* Site Header */}
      <Box sx={{ mb: 1 }}>
        <Typography variant="h4" component="h1" sx={{ color: '#5ACCCC', fontFamily: 'Arial' }}>
          Ello
        </Typography>
      </Box>

      {/* Main Content */}
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
  );
};

export default App;
