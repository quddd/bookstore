//action to add book
export const addBook = (book) => {
  return {
    type: "ADD_BOOK",
    book: book,
  };
};

//action to delete book
export const deleteBook = (index) => {
  return {
    type: "DELETE_BOOK",
    index: index,
  };
};

export const updateBook = (book) => {
  return {
    type: "UPDATE_BOOK",
    book: book,
  };
};
