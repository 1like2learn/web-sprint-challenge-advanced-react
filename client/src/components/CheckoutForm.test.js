import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

const setup = () => {
  render(<CheckoutForm />);
  const header = screen.getByText(/checkout form/i)
  const firstName = screen.getByLabelText(/first name/i)
  const lastName = screen.getByLabelText(/last name/i)
  const address = screen.getByLabelText(/address/i)
  const city = screen.getByLabelText(/city/i)
  const state = screen.getByLabelText(/state/i)
  const zip = screen.getByLabelText(/zip/i)
  const submitButton = screen.getByTestId("checkoutSubmit")
  return {
    header,
    firstName,
    lastName,
    address,
    city,
    state,
    zip,
    submitButton
  };
};
test("form header renders", () => {
  const { header } = setup()
  expect(header).toHaveTextContent(/checkout form/i)
});

test("form shows success message on submit with form details", async () => {
  const { firstName, lastName, address, city, state, zip, submitButton } = setup()
  const inputFields = ( input, value ) => {
    fireEvent.change(input, {target: {value: value}});
  }

  inputFields( firstName, 'Dustin')
  inputFields( lastName, 'Myers')
  inputFields( address, '505 Ezy St')
  inputFields( city, 'New York')
  inputFields( state, 'NY')
  inputFields( zip, '12345')
  
  fireEvent.click(submitButton)
  await expect(screen.getByText(/Dustin/i)).toHaveTextContent(/Dustin/i)
  await expect(screen.getByText(/Myers/i)).toHaveTextContent(/Myers/i)
  await expect(screen.getByText(/505 Ezy St/i)).toHaveTextContent(/505 Ezy St/i)
  await expect(screen.getByText(/New York/i)).toHaveTextContent(/New York/i)
  await expect(screen.getByText(/NY/i)).toHaveTextContent(/NY/i)
  await expect(screen.getByText(/12345/i)).toHaveTextContent(/12345/i)


});
