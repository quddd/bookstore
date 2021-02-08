const bookList = [
  {
    _id: 1,
    name: "Harry Potter and the Deathly Hallows",
    price: "20",
    category: "Fiction",
    description:
      "Harry Potter and the Deathly Hallows is a fantasy novel written by British author J. K. Rowling.",
  },
  {
    _id: 2,
    name: "Game Of Thrones",
    price: "40",
    category: "Political fantasy",
    description:
      "Game of Thrones is an HBO series that tells the story of a medieval country's civil war.",
  },
  {
    _id: 3,
    name: "Life of Pi",
    price: "30",
    category: "Fiction",
    description:
      "Life of Pi is a Canadian philosophical novel by Yann Martel published in 2001",
  },
];

const bookReducer = (state = { bookList }, action) => {
  switch (action.type) {
    case "ADD_BOOK": {
      return {
        ...state,
        bookList: [...state.bookList, action.book],
      };
    }
    case "DELETE_BOOK": {
      return {
        ...state,
        bookList: [
          ...state.bookList.slice(0, action.index),
          ...state.bookList.slice(action.index + 1),
        ],
      };
    }
    case "UPDATE_BOOK": {
      const index = state.bookList.findIndex(
        (book) => book._id === action.book._id
      ); //find index of book to update

      const newArr = [...state.bookList];

      newArr[index] = action.book;
      return {
        ...state,
        bookList: newArr,
      };
    }
    default:
      return state;
  }
};

export default bookReducer;
