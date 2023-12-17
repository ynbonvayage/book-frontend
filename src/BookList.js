import Book from "./Book";
import { useCallback, useEffect, useState } from "react";
const BookList = ({ books, showError }) => {
  const setState = useState({})[1];

  const onUpdate = useCallback(() => {
    setState({});
  }, [setState]);

  useEffect(() => {
    books.on("add", onUpdate);
    books.on("remove", onUpdate);
    return () => {
      books.off("add", onUpdate);
      books.off("remove", onUpdate);
    };
  }, [books, onUpdate]);

  return (
    <>
      {Array.from(books).map((m) => (
        <Book key={m.id} books={books} book={m} showError={showError} />
      ))}
    </>
  );
};
export default BookList;
