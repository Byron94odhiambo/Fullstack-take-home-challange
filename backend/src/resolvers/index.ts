import { booksData } from '../data/books';

export const resolvers = {
  Query: {
    books: (_: any, { title }: { title: string }) => {
      console.log(`Searching for books with title containing: ${title}`);
      const results = booksData.filter((book) => book.title.toLowerCase().includes(title.toLowerCase()));
      console.log('Found books:', results);
      return results;
    },
  },
};
