import { useEffect, useState } from "react";

const Book = ({ book, books, showError }) => {
  const [state, setState] = useState({
    isEdit: false,
    title: "",
    author: "",
  });

  const handleEdit = () => {
    setState({
      isEdit: true,
      title: book.title,
      author: book.author,
    });
  };

  const handleDelete = () => {
    books
      .call("delete", {
        id: book.id,
      })
      .catch(showError);
  };

  const handleOk = () => {
    book
      .set({
        title: state.title,
        author: state.author,
      })
      .then(() =>
        setState({
          ...state,
          isEdit: false,
        }),
      )
      .catch(showError);
  };

  const handleCancel = () => {
    setState({
      ...state,
      isEdit: false,
    });
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

  const onUpdate = () => {
    setState({});
  };

  useEffect(() => {
    book.on("change", onUpdate);
    return () => {
      book.off("change", onUpdate);
    };
  }, [book]);

  return (
    <div className="row m-1">
      <div className="card mb-3 p-3 bg-light ">
        {state.isEdit ? (
          <>
            <div className="row">
              <div className="col input-group">
                <label className="input-group-text">Title</label>
                <input
                  className="form-control input-group"
                  type="text"
                  value={state.title}
                  onChange={handleTitleChange}
                />
              </div>
              <div className="col text-end">
                <button onClick={handleOk} className="btn btn-primary">
                  OK
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col input-group">
                <label className="input-group-text">Author</label>
                <input
                  className="form-control input-group"
                  type="text"
                  value={state.author}
                  onChange={handleAuthorChange}
                />
              </div>
              <div className="col text-end">
                <button onClick={handleCancel} className="btn btn-warning">
                  Cancel
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="row">
              <div className="col">
                <h3>{book.title}</h3>
              </div>
              <div className="col text-end">
                <button className="btn btn-primary" onClick={handleEdit}>
                  Edit
                </button>
                <button className="btn btn-warning" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
            <div className="col">
              <h6>By {book.author}</h6>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Book;
