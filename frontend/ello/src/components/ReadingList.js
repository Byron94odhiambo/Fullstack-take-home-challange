import React from 'react';
import { Grid, Card, CardContent, CardActions, Typography, Button, Box } from '@mui/material';

const ReadingList = ({ readingList, removeFromReadingList }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ borderBottom: '2px solid #335C6E', mb: 2 }}>
        <Typography variant="h4" sx={{ color: '#335C6E', fontFamily: 'Arial', mb: 1 }}>
          Reading List
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {readingList.map((book, index) => (
          <Grid item xs={12} key={index}>
            <Card sx={{ background: '#FFFFF', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}>
              <CardContent>
                <Typography variant="h6" component="div" sx={{ color: '#335C6E' }}>
                  {book.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ color: '#335C6E' }}>
                  {book.author}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={() => removeFromReadingList(book)}
                  sx={{ color: '#FFFFF', background: '#FF6F61' }} // Orange Red
                >
                  Remove
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ReadingList;
