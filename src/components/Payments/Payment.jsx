import { Button } from "@material-ui/core";
import React from "react";
import payment from "../../assets/images/payment.png";
import { useStyles } from "../../styles";
const Payment = () => {
  const classes = useStyles();
  return (
    <div className="payment">
      <div className="payment__pic__div">
        <img src={payment} alt="payment" className="payment__pic__div__img" />
      </div>
      <div className="payment__btn__div">
        <Button variant="contained" className="payment__btn__div__successbtn">
          <strong>پرداخت موفق</strong>
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className="payment__btn__div__unsuccessbtn"
        >
          <strong>پرداخت ناموفق</strong>
        </Button>
      </div>
    </div>
  );
};

export default Payment;
