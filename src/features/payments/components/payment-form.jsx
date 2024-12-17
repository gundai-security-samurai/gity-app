"use client";

import { CreditCard, PaymentForm as Form } from "react-square-web-payments-sdk";

const PaymentForm = () => {
  return (
    <Form
      applicationId={process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID}
      locationId={process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID}
      cardTokenizeResponseReceived={async (token) => {
        console.log("🚀 ~ cardTokenizeResponseReceived={ ~ token:", token);
      }}
    >
      <CreditCard />
    </Form>
  );
};

export default PaymentForm;
