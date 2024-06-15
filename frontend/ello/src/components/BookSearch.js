// components/BookSearch.js (continued)
import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Box, CircularProgress, Card, CardContent, CardActions, Typography} from '@mui/material';
import { useLazyQuery } from '@apollo/client';
import { BOOKS_QUERY } from '../queries';
import { useSpring, animated } from 'react-spring';

const BookSearch = ({ addToReadingList, initialBooks }) => {
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [page, setPage] = useState(1);
  

  useEffect(() => {
    setOptions(initialBooks);
  }, [initialBooks]);

  const [fetchBooks] = useLazyQuery(BOOKS_QUERY, {
    onCompleted: (data) => {
      setOptions(data.books);
      setLoading(false);
      setSearched(true);
      
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
    setPage(1);
    fetchBooks({ variables: { title: query, page: 1 } });
  };

  const handleLoadMore = () => {
    setLoading(true);
    fetchBooks({ variables: { title: query, page: page + 1 } });
    setPage(page + 1);
  };

  const fadeInAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 },
  });

  return (
    <animated.div style={fadeInAnimation}>
      <Box sx={{ marginTop: 4, marginBottom: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Mulish', color: '#335C6E', marginBottom: 2 }}>
          Welcome teacher!
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
              sx={{ height: '100%', backgroundColor: '#FABD33', color: '#335C6E', '&:hover': { backgroundColor: '#FABD33' }, fontFamily: 'Mulish' }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
        {(options.length > 0 || loading) && (
          <Box sx={{ marginTop: 2 }}>
            <Grid container spacing={2}>
              {options.slice(0, 20).map((book, index) => ( // Limit to first 20 books
                <Grid item xs={12} sm={6} md={6} key={index}>
                  <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', backgroundColor: '#5ACCCC', color: '#FFFFFF' }}>
                    <CardContent>
                      <Typography variant="h6" component="div" sx={{ marginBottom: 1, fontFamily: 'Mulish', color: '#FFFFFF' }}>
                        {book.title}
                      </Typography>
                      <Typography variant="body2" color="inherit" sx={{ marginBottom: 1, fontFamily: 'Mulish', color: '#FFFFFF' }}>
                        {book.author}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        variant="contained"
                        color="secondary"
                        onClick={() => addToReadingList(book)}
                        sx={{ margin: 'auto', backgroundColor: '#FABD33', color: '#335C6E', '&:hover': { backgroundColor: '#FABD33' }, fontFamily: 'Mulish' }}
                      >
                        Add to Reading List
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {options.length > 20 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLoadMore}
                  disabled={loading}
                  sx={{ backgroundColor: '#FABD33', color: '#335C6E', '&:hover': { backgroundColor: '#FABD33' }, fontFamily: 'Mulish' }}
                >
                  Load More
                </Button>
              </Box>
            )}
          </Box>
        )}
        {searched && !loading && options.length === 0 && (
          <Typography variant="body1" color="textSecondary" sx={{ marginTop: 2, fontFamily: 'Mulish', color: '#335C6E' }}>
            No results found
          </Typography>
        )}
      </Box>
    </animated.div>
  );
};

export default BookSearch;
