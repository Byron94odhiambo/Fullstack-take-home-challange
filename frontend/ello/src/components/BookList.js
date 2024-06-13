import React from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Box } from '@mui/material';

const BookList = ({ books }) => {
  console.log('Books:', books);

  if (books.length === 0) {
    return <Typography variant="h6">No results found</Typography>;
  }

  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="h5">Search Results</Typography>
      <List>
        {books.map((book, index) => (
          <ListItem key={index} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={book.title} src={book.coverPhotoURL} />
            </ListItemAvatar>
            <ListItemText
              primary={book.title}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {book.author}
                  </Typography>
                  {" — Reading Level: " + book.readingLevel}
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default BookList;
