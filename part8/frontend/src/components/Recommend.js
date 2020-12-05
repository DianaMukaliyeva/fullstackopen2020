import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery, useSubscription } from '@apollo/client';
import { ME, ALL_BOOKS, BOOK_ADDED } from '../queries';
import BooksTable from './BooksTable';

const Recommend = ({ show, notify }) => {
  const user = useQuery(ME);
  const [favoriteGenre, setFavoriteGenre] = useState('');
  const [books, setBooks] = useState([]);
  const [getBooks] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => setBooks(data.allBooks),
    onError: (error) => {
      notify(error.message, true);
    },
  });

  useEffect(() => {
    if (user.data && user.data.me) {
      setFavoriteGenre(user.data.me.favoriteGenre);
      getBooks({ variables: { genre: user.data.me.favoriteGenre } });
    }
  }, [user.data, getBooks]);

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const book = subscriptionData.data.bookAdded;
      const includedIn = (set, object) => set.map((p) => p.id).includes(object.id);

      if (!includedIn(books, book)) {
        setBooks([...books, book]);
      }
    },
  });

  if (!show) {
    return null;
  }

  if (user.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{favoriteGenre}</b>
      </p>
      <BooksTable books={books} />
    </div>
  );
};

export default Recommend;
