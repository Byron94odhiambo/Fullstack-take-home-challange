import React, { useState } from 'react';
import { TextField, Button, Grid, Box, CircularProgress, Autocomplete, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { useLazyQuery } from '@apollo/client';
import { BOOKS_QUERY } from '../queries';

const BookSearch = ({ setBooks }) => {
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [fetchBooks] = useLazyQuery(BOOKS_QUERY, {
    onCompleted: (data) => {
      console.log('Query completed:', data);
      setOptions(data.books);
      setLoading(false);
    },
    onError: (error) => {
      console.error('Error fetching books:', error);
      setLoading(false);
    },
  });

  const handleSearch = () => {
    setLoading(true);
    fetchBooks({ variables: { title: query } });
  };

  const handleAddToReadingList = (book) => {
    // Implement logic to add the book to the reading list
    console.log('Add book to reading list:', book);
  };

  return (
    <Box sx={{ marginTop: 4, marginBottom: 4 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8}>
          <Autocomplete
            freeSolo
            options={options}
            getOptionLabel={(option) => option.title}
            renderOption={(props, option) => (
              <li {...props}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <span>{option.title}</span>
                  <small>{option.author}</small>
                </Box>
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                label="Search for books"
                variant="outlined"
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
            onInputChange={(event, value) => setQuery(value)}
          />
        </Grid>
        <Grid item xs={4}>
          <Button 
            fullWidth 
            onClick={handleSearch} 
            variant="contained" 
            color="primary"
            sx={{ height: '100%' }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      <Box>
        {options.map((book, index) => (
          <ListItem key={index}>
            <ListItemText primary={book.title} secondary={book.author} />
            <ListItemSecondaryAction>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleAddToReadingList(book)}
              >
                Add to Reading List
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </Box>
    </Box>
  );
};

export default BookSearch;
