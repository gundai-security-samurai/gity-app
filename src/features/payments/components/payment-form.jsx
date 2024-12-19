"use client";

import { CreditCard, PaymentForm as Form } from "react-square-web-payments-sdk";

const PaymentForm = ({ onPayment, disabled }) => {
  return (
    <Form
      applicationId={process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID}
      locationId={process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID}
      cardTokenizeResponseReceived={async (token) => {
        onPayment(token.token);
      }}
    >
      <CreditCard buttonProps={{ isLoading: disabled }} />
    </Form>
  );
};

export default PaymentForm;
