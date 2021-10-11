import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Fade } from "react-reveal";
import {
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import CheckoutForm from "./components/CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

export default function StripeCheckout(props) {
  return (
    <CModal
      show={props.open}
      onClose={() => props.close(false)}
      closeOnBackdrop={false}
      centered={true}
    >
      <Fade>
        <CModalHeader closeButton>
          <CModalTitle> Make A Fund </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <Elements stripe={stripePromise}>
            <CheckoutForm
              name={props.name}
              address={props.address}
              amount={props.amount}
              mobile={props.mobile}
              user_id={props.user_id}
              post_id={props.post_id}
              description={props.description}
              close={props.close}
              category={props.category}
            />
          </Elements>
        </CModalBody>
        <CModalFooter>
          <small>
            Your payment information will not be saved in our system at any
            situation
          </small>
        </CModalFooter>
      </Fade>
    </CModal>
  );
}
