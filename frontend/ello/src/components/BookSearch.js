import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Box, CircularProgress, Card, CardContent, CardActions, Typography, CardMedia } from '@mui/material';
import { useLazyQuery } from '@apollo/client';
import { BOOKS_QUERY } from '../queries';
import { useSpring, animated } from 'react-spring';

const BookSearch = ({ addToReadingList, initialBooks }) => {
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [page, setPage] = useState(1); // Current page state
  const [hasMore, setHasMore] = useState(false); // State to track if there are more books to fetch

  useEffect(() => {
    setOptions(initialBooks);
  }, [initialBooks]);

  const [fetchBooks] = useLazyQuery(BOOKS_QUERY, {
    onCompleted: (data) => {
      setOptions(data.books);
      setLoading(false);
      setSearched(true);
      setHasMore(data.books.length === 20); // Check if fetched books are exactly 20 to determine if there are more pages
    },
    onError: (error) => {
      console.error('Error fetching books:', error);
      setLoading(false);
      setSearched(true);
    },
  });

  const handleSearch = () => {
    setLoading(true);
    setSearched(false);
    setPage(1); // Reset page number on new search
    fetchBooks({ variables: { title: query, page: 1 } });
  };

  const handleLoadMore = () => {
    setLoading(true);
    fetchBooks({ variables: { title: query, page: page + 1 } });
    setPage(page + 1); // Increment page number
  };

  // Animation config using react-spring
  const fadeInAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 },
  });

  return (
    <animated.div style={fadeInAnimation}>
      <Box sx={{ marginTop: 4, marginBottom: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ marginBottom: 2 }}>
          Welcome, Teacher!
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <TextField
              fullWidth
              label="Search for books"
              variant="outlined"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              InputProps={{
                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="primary" size={20} /> : null}
                  </>
                ),
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              fullWidth
              onClick={handleSearch}
              variant="contained"
              color="primary"
              sx={{ height: '100%', backgroundColor: '#FABD33', color: '#335C6E', '&:hover': { backgroundColor: '#FABD33' } }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
        {(options.length > 0 || loading) && (
          <Box sx={{ marginTop: 2 }}>
            <Grid container spacing={2}>
              {options.map((book, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', backgroundColor: '#5ACCCC', color: '#FFFFFF' }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={book.coverPhotoURL}
                      alt={book.title}
                    />
                    <CardContent>
                      <Typography variant="h6" component="div" sx={{ marginBottom: 1 }}>
                        {book.title}
                      </Typography>
                      <Typography variant="body2" color="inherit" sx={{ marginBottom: 1 }}>
                        {book.author}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        variant="contained"
                        color="secondary"
                        onClick={() => addToReadingList(book)}
                        sx={{ margin: 'auto', backgroundColor: '#FABD33', color: '#335C6E', '&:hover': { backgroundColor: '#FABD33' } }}
                      >
                        Add to Reading List
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {hasMore && (
              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLoadMore}
                  disabled={loading}
                  sx={{ backgroundColor: '#FABD33', color: '#335C6E', '&:hover': { backgroundColor: '#FABD33' } }}
                >
                  Load More
                </Button>
              </Box>
            )}
          </Box>
        )}
        {searched && !loading && options.length === 0 && (
          <Typography variant="body1" color="textSecondary" sx={{ marginTop: 2 }}>
            No results found
          </Typography>
        )}
      </Box>
    </animated.div>
  );
};

export default BookSearch;
