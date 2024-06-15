// App.js
import React, { useEffect, useState } from 'react';
import { Container, Grid, Box } from '@mui/material';
import { useLazyQuery } from '@apollo/client';
import { BOOKS_QUERY } from './queries';
import BookSearch from './components/BookSearch';
import ReadingList from './components/ReadingList';
import NavBar from './components/NavBar';

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
    fetchInitialBooks({ variables: { title: '' } });
    document.title = "Teacher's Portal"; // Set the document title
  }, [fetchInitialBooks]);

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
      <NavBar />
      <Container maxWidth="lg" sx={{ flexGrow: 1, ml: '240px' }}>
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
