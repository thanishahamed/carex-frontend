import React, { useEffect, useMemo, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import AccountCircle from "@material-ui/icons/AccountCircle";
import {
  Call,
  Description,
  LocationCity,
  MonetizationOn,
  Payment,
  PaymentRounded,
  StayCurrentLandscape,
} from "@material-ui/icons";
import { CTextarea } from "@coreui/react";
import SnackBar from "src/views/alertComponents/SnackBar";
import PaymentSuccess from "./PaymentSuccess";

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [data, setData] = useState({});
  const [message, setMessage] = useState("Add a fund");
  const [variant, setVariant] = useState("success");
  const [error, setError] = useState(false);
  const [fired, setFired] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setData({
      name: props.name,
      address: props.address,
      amount: props.amount,
      mobile: props.mobile,
      description: props.description,
      user_id: props.user_id,
      post_id: props.post_id,
      category: props.category,
    });
  }, [props.post_id]);

  useEffect(() => {}, [error]);

  const validated = () => {
    if (
      data.amount === "" ||
      data.address === "" ||
      data.mobile === "" ||
      data.name === ""
    ) {
      setVariant("warning");
      setMessage("Please fill all fields");
      setFired((f) => !f);
      return false;
    } else if (data.amount < 100) {
      setVariant("warning");
      setMessage("The minimum amount allowed is Rs. 100");
      setFired((f) => !f);
    } else {
      return true;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("user id", props.user_id, "post id", props.post_id);
    if (!validated()) {
      return null;
    } else {
      setSaving(true);
      setSaved(false);
      if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return;
      }

      const cardElement = elements.getElement(CardElement);

      const res = await stripe.createToken(cardElement);
      // console.log(res);
      if (res.error) {
        console.log("[error]", res.error);
        setSaving(false);
      } else {
        //   console.log("Displaying Payment Method", res.token);

        try {
          const response = await axios.post(
            `${process.env.REACT_APP_SERVER}/fund`,
            { amount: data.amount, ...res.token }
          );

          if (response.data.amount > 0) {
            try {
              const insertResponse = await axios.post(
                process.env.REACT_APP_SERVER + "/update-fund",
                data
              );
              setSaving(false);
              setSaved(true);
              console.log(insertResponse.data);
            } catch (error) {
              setSaving(false);
              console.log(error.response);
            }
          } else {
            console.log("failed");
          }
        } catch (error) {
          console.log(error.response);
          setSaving(false);
        }
      }
    }
  };

  const handleTextChange = (e) => {
    setData((d) => ({ ...d, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <Grid container spacing={3} alignItems="flex-end">
        {saved ? (
          <PaymentSuccess close={props.close} setSaved={setSaved} />
        ) : (
          ""
        )}
        {/* <PaymentSuccess close={props.close} /> */}
        <Grid item>
          <AccountCircle />
        </Grid>
        <Grid item xs={10}>
          <TextField
            label="Name"
            fullWidth
            value={data.name}
            name="name"
            onChange={handleTextChange}
          />
        </Grid>

        <Grid item>
          <LocationCity />
        </Grid>
        <Grid item xs={10}>
          <TextField
            label="Address"
            fullWidth
            value={data.address}
            name="address"
            onChange={handleTextChange}
          />
        </Grid>

        <Grid item>
          <MonetizationOn />
        </Grid>
        <Grid item xs={10}>
          <TextField
            label="Amount in Rupees (LKR)"
            fullWidth
            type="number"
            name="amount"
            onChange={handleTextChange}
            value={data.amount}
          />
        </Grid>

        <Grid item>
          <Call />
        </Grid>
        <Grid item xs={10}>
          <TextField
            label="Mobile Number"
            fullWidth
            value={data.mobile}
            onChange={handleTextChange}
            name="mobile"
            type="number"
          />
        </Grid>
        <Grid item>
          <Description />
        </Grid>
        <Grid item xs={10}>
          <CTextarea
            placeholder="Description (Optional)"
            fullWidth
            onChange={handleTextChange}
            value={data.description}
            name="description"
          />
        </Grid>
        <hr />
        <Grid item>
          <Payment />
        </Grid>
        <Grid item xs={10}>
          <Paper style={{ height: 30, paddingLeft: 5 }}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
                hidePostalCode: true,
              }}
            />
          </Paper>
        </Grid>
      </Grid>
      <br /> <br />
      <center>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!stripe}
          disabled={saving || saved}
        >
          {saving ? (
            <>
              <CircularProgress color="inherit" size={16} /> Saving{" "}
            </>
          ) : saved ? (
            "Settled"
          ) : (
            "Settle"
          )}
        </Button>
      </center>
      <SnackBar fired={fired} variant={variant} message={message} />
    </div>
  );
};

export default CheckoutForm;
