import React, { useEffect, useState } from "react";
import { FormControl, TextField, makeStyles, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addBook, updateBook } from "../actions/bookstore";
import { useSelector } from "react-redux";
import AlertMessage from "../Alert";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  textField: {
    margin: theme.spacing(1),
  },
  submitButton: {
    maxWidth: 50,
    float: "right",
  },
}));

//for unique id
let counter = 3;

function AddBookForm({ setOpenPopup, bookToEdit, setBookToEdit }) {
  const classes = useStyles();
  const [book, setBook] = useState({
    _id: counter + 1,
    name: "",
    price: "",
    category: "",
    description: "",
  });
  const dispatch = useDispatch();
  const [alert, setAlert] = useState({ error: false, message: "" });

  const handleChange = (event) => {
    setBook({
      ...book,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = () => {
    //form validation
    if (!book.name) {
      setAlert({ error: true, message: "Please provide a name!" });
      return;
    }
    if (!book.price) {
      setAlert({ error: true, message: "Please provide a price!" });
      return;
    }
    if (!book.category) {
      setAlert({ error: true, message: "Please provide category!" });
      return;
    }
    if (!book.description) {
      setAlert({ error: true, message: "Please provide a description!" });
      return;
    }
    //check if user is updating a book else add book
    if (bookToEdit) {
      dispatch(updateBook(book));
      setBookToEdit(null);
    } else {
      dispatch(addBook(book));
      counter++;
    }
    setOpenPopup(false);
  };

  useEffect(() => {
    if (bookToEdit != null) {
      setBook({
        ...bookToEdit,
      });
    }
  }, [bookToEdit]);

  return (
    <div className={classes.container}>
      <FormControl className={classes.textField}>
        <TextField
          label='name'
          variant='outlined'
          onChange={(e) => handleChange(e)}
          name='name'
          value={book.name}
        />
      </FormControl>
      <FormControl className={classes.textField}>
        <TextField
          label='price'
          variant='outlined'
          name='price'
          value={book.price}
          onChange={(e) => handleChange(e)}
        />
      </FormControl>
      <FormControl className={classes.textField}>
        <TextField
          label='category'
          variant='outlined'
          value={book.category}
          name='category'
          onChange={(e) => handleChange(e)}
        />
      </FormControl>
      <FormControl className={classes.textField}>
        <TextField
          label='description'
          multiline
          rows={5}
          variant='outlined'
          name='description'
          value={book.description}
          onChange={(e) => handleChange(e)}
        />
      </FormControl>
      <div>
        <Button
          className={classes.submitButton}
          variant='contained'
          color='primary'
          onClick={handleSubmit}
        >
          {" "}
          Submit{" "}
        </Button>
      </div>
      <AlertMessage alert={alert} />
    </div>
  );
}

export default AddBookForm;
