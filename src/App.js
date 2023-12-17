import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ResClient from "resclient";
import BookList from "./BookList";

const App = () => {
  const errorTimer = useRef(null);

  const client = useMemo(() => new ResClient("ws://127.0.0.1:8080"), []);

  const [state, setState] = useState({
    title: "",
    author: "",
    books: null,
    error: "",
  });

  const showError = useCallback((err) => {
    setState((state) => ({
      ...state,
      error: err,
    }));
    clearTimeout(errorTimer.current);
    errorTimer.current = setTimeout(
      () =>
        setState({
          ...state,
          error: "",
        }),
      7000,
    );
  }, []);

  const handleAddNew = () => {
    client
      .call("library.books", "new", {
        title: state.title,
        author: state.author,
      })
      .then(() =>
        setState({
          ...state,
          title: "",
          author: "",
        }),
      )
      .catch(showError);
  };

  const handleTitleChange = (e) => {
    setState({
      ...state,
      title: e.target.value,
    });
  };

  const handleAuthorChange = (e) => {
    setState({
      ...state,
      author: e.target.value,
    });
  };

  useEffect(() => {
    client
      .get("library.books")
      .then((books) => {
        setState({ books });
      })
      .catch(showError);
  }, [client, showError]);

  return (
    <div className="container bg-light rounded vh-100">
      <h1 className="text-center">Book Collection Example</h1>
      <div className="input-group">
        <label htmlFor="new-title" className="input-group-text">
          Title
        </label>
        <input
          type="text"
          className="form-control input-group rounded"
          name="new-title"
          value={state.title}
          onChange={handleTitleChange}
        />
        <label htmlFor="new-author" className="input-group-text">
          Author
        </label>
        <input
          type="text"
          className="form-control input-group rounded"
          name="new-author"
          value={state.author}
          onChange={handleAuthorChange}
        />
        <button className="btn btn-primary rounded" onClick={handleAddNew}>
          Add new
        </button>
      </div>
      <p className="text-danger">{JSON.stringify(state.error)}</p>
      {state.books ? (
        <BookList books={state.books} showError={showError}></BookList>
      ) : null}
    </div>
  );
};

export default App;
