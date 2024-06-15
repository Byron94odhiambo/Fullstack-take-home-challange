// components/ReadingList.js
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Divider,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  OutlinedInput,
} from '@mui/material';

const ReadingList = ({ readingList, removeFromReadingList }) => {
  const [classMap, setClassMap] = useState({}); // State to store class selections for each book

  const handleAddToClass = (book, selectedClass) => {
    // Logic to add the book to the selected class object
    console.log(`Added book "${book.title}" to class: ${selectedClass}`);
    // You can add further logic here to integrate with your class management system
  };

  const handleClassChange = (book, event) => {
    const selectedClass = event.target.value;
    setClassMap({ ...classMap, [book.title]: selectedClass });
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Card sx={{ background: '#FFFFFF', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
          <Typography variant="h4" sx={{ fontFamily: 'Mulish', color: '#335C6E', mb: 2 }}>
            Reading List
          </Typography>
          {readingList.map((book, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
              <Typography variant="h6" component="div" sx={{ color: '#335C6E', fontFamily: 'Mulish' }}>
                {book.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ color: '#335C6E', fontFamily: 'Mulish' }}>
                {book.author}
              </Typography>
              <FormControl fullWidth sx={{ marginTop: 1 }}>
                <InputLabel htmlFor={`class-select-${index}`}>Select Class</InputLabel>
                <Select
                  value={classMap[book.title] || ''}
                  onChange={(e) => handleClassChange(book, e)}
                  input={<OutlinedInput label="Select Class" id={`class-select-${index}`} />}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#335C6E',
                      },
                      '&:hover fieldset': {
                        borderColor: '#335C6E',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#335C6E',
                      },
                    },
                  }}
                >
                  <MenuItem value={'Class A'}>Class A</MenuItem>
                  <MenuItem value={'Class B'}>Class B</MenuItem>
                  <MenuItem value={'Class C'}>Class C</MenuItem>
                </Select>
              </FormControl>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={() => removeFromReadingList(book)}
                  sx={{ color: '#FFFFFF', background: '#FF6F61', fontFamily: 'Mulish' }} // Orange Red
                >
                  Remove
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddToClass(book, classMap[book.title])}
                  sx={{ marginLeft: 1, fontFamily: 'Mulish' }}
                  disabled={!classMap[book.title]} // Disable button if no class selected
                >
                  Add to Class
                </Button>
              </CardActions>
              {index !== readingList.length - 1 && <Divider sx={{ marginY: 2 }} />} {/* Add Divider except for the last item */}
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ReadingList;
