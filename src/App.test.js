import { render, screen, fireEvent, act } from "@testing-library/react";
import App from "./App";

test("renders header link", () => {
  const method = render(<App />);
  const chartLink = screen.getByText("Chart");
  const homeLink = screen.getByText("Home");
  expect(chartLink).toBeInTheDocument();
  expect(homeLink).toBeInTheDocument();
});

test("intial loading shows loader", () => {
  const { getByTestId } = render(<App />);
  const loader = getByTestId("loader");
  expect(loader).toBeInTheDocument();
});

test("policy data render", async () => {
  const { getByTestId } = render(<App />);
  const policiesCard = getByTestId("policy-card-container");
  expect(policiesCard).toBeInTheDocument();
});

test("user query search", async () => {
  const { getByLabelText, getByTestId, container } = render(<App />);
  const selectQuery = screen.getByLabelText("Choose your search criteria:");
  const inputQuery = getByTestId("user-search-input");
  const querySubmitButton = getByTestId("user-search-button");
  selectQuery.value = "customerId";
  inputQuery.value = 420;
  act(() => {
    fireEvent.change(selectQuery);
  });
  act(() => {
    fireEvent.change(inputQuery);
  });
  act(() => {
    fireEvent.click(querySubmitButton);
  });
  const loader = getByTestId("loader");
  expect(loader).toBeInTheDocument();
});
