import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import { Button, Box, Typography, TableSortLabel } from "@material-ui/core";
import { useStyles } from "../../styles/index";
import MainModal from "../MainModal";
import CancelIcon from "@material-ui/icons/Cancel";
import UnCompletedOrdersModal from "./UnCompletedOrdersModal";
import { useSelector, useDispatch } from "react-redux";
import {
  SetselectedProduct,
  setUncompeletedCarts,
} from "../../redux/actions/productActions";
export default function SimpleTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [orders, setOrders] = useState([]);
  const [openDelivery, setOpenDelivery] = React.useState(false);
  const [sort, setSort] = useState({ direction: "asc" });
  const uncompeletedOrders = useSelector(
    (state) => state.allProducts.unCompeletedCarts
  );
  const selectedCart = useSelector(
    (state) => state.allProducts.selectedProduct
  );
  const dispatch = useDispatch();

  const compareBy = (key) => {
    return function (a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
  };
  const sortBy = (key) => {
    const direction = sort
      ? sort.direction === "asc"
        ? "desc"
        : "asc"
      : "desc";

    let arrayCopy = [...uncompeletedOrders];
    arrayCopy.sort(compareBy(key));
    dispatch(setUncompeletedCarts(arrayCopy));
    if (direction === "asc") {
      arrayCopy.reverse();
    }
    dispatch(setUncompeletedCarts(arrayCopy));
    setSort({ direction });
  };

  const getTotal = (products) => {
    let prices = products.map((order, index) => order.price);
    const total = prices
      .reduce((sum, item) => (sum += item), 0)
      .toLocaleString("fa-IR");
    return total;
  };

  const handleClick = (order) => {
    dispatch(SetselectedProduct(order));
    setOpenDelivery(true);
  };

  const handleClose = () => {
    setOpenDelivery(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, uncompeletedOrders?.length - page * rowsPerPage);
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.tablehead}>
            <TableRow>
              <TableCell className={classes.headcell}>نام کاربر</TableCell>
              <TableCell className={classes.headcell}>مجموع مبلغ</TableCell>
              <TableCell onClick={() => sortBy("date")}>
                <TableSortLabel direction={sort.direction} active={true}>
                  زمان ثبت سفارش
                </TableSortLabel>
              </TableCell>
              <TableCell className={classes.headcell}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tablebody}>
            {uncompeletedOrders
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order, index) => (
                <TableRow key={index}>
                  <TableCell>{order.information.customerName}</TableCell>
                  <TableCell>{getTotal(order.orders)}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.tableBtn}
                      onClick={() => handleClick(order, order.userId)}
                    >
                      بررسی سفارش
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={uncompeletedOrders?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <MainModal open={openDelivery} handleClose={handleClose}>
        <div className={classes.modalContent}>
          <Box component="div" className={classes.deliverymodal}>
            <Box component="div" className={classes.checkorders}>
              <Typography variant="h6">نمایش سفارش</Typography>
              <CancelIcon
                className={classes.closeModalIcon}
                onClick={handleClose}
              />
            </Box>
            <Box component="div">
              <UnCompletedOrdersModal closeModal={handleClose} />
            </Box>
          </Box>
        </div>
      </MainModal>
    </>
  );
}
