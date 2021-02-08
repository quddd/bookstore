import React, { useState } from "react";
import {
  Button,
  IconButton,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  makeStyles,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import Popup from "./Popup";
import AddBookForm from "./AddBookForm";
import { useSelector, useDispatch } from "react-redux";
import { deleteBook } from "../actions/bookstore";

const useStyles = makeStyles((theme) => ({
  addButton: {
    float: "left",
    color: theme.palette.grey[600],
  },
  table: {
    minWidth: 600,
  },
  tableHead: {
    backgroundColor: theme.palette.grey[800],
    fontWeight: 600,
    color: theme.palette.common.white,
  },
  tableRow: {
    cursor: "pointer",
  },
}));

function BookStore() {
  const bookList = useSelector((state) => state.bookList); //get booklist from redux state
  const dispatch = useDispatch();
  const [openPopup, setOpenPopup] = useState(false); //to set handle popup open or close
  const classes = useStyles();
  const [bookToEdit, setBookToEdit] = useState(null);

  const handleDelete = (index) => {
    //onclick handler for delete button
    dispatch(deleteBook(index));
  };
  //function to set details and open form to edit a book
  const openInForm = (book) => {
    setBookToEdit(book);
    setOpenPopup(true);
  };
  return (
    <div>
      <Typography align='center' component='h4' variant='h4'>
        {" "}
        Bookstore
      </Typography>
      <div>
        <IconButton
          color='primary'
          className={classes.addButton}
          onClick={() => {
            setOpenPopup(true);
            setBookToEdit(null);
          }}
        >
          <AddIcon fontSize='large' />
          Add a book
        </IconButton>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align='left' className={classes.tableHead}>
                Name
              </TableCell>
              <TableCell align='left' className={classes.tableHead}>
                Price
              </TableCell>
              <TableCell align='left' className={classes.tableHead}>
                Category
              </TableCell>
              <TableCell align='left' className={classes.tableHead}>
                Description
              </TableCell>
              <TableCell align='left' className={classes.tableHead}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookList.map((book, key) => (
              <TableRow key={key} className={classes.tableRow}>
                <TableCell align='left' onClick={() => openInForm(book)}>
                  {book.name}
                </TableCell>
                <TableCell align='left' onClick={() => openInForm(book)}>
                  {book.price}
                </TableCell>
                <TableCell align='left' onClick={() => openInForm(book)}>
                  {book.category}
                </TableCell>
                <TableCell align='left' onClick={() => openInForm(book)}>
                  {book.description}
                </TableCell>
                <TableCell align='left'>
                  <IconButton
                    aria-label='delete'
                    onClick={() => handleDelete(key)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <AddBookForm
          setOpenPopup={setOpenPopup}
          bookToEdit={bookToEdit}
          setBookToEdit={setBookToEdit}
        />
      </Popup>
    </div>
  );
}

export default BookStore;
