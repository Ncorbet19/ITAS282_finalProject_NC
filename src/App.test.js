jest.mock('axios');
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./Components/App";
import { BrowserRouter as Router } from "react-router-dom";
import { act } from "react-dom/test-utils";

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(<Router>{ui}</Router>, renderOptions);
};

test("logging in, creating a club, and adding a movie", async () => {
  customRender(<App />, {});

  // Log in with provided email and password
  fireEvent.click(screen.getByText(/Log in/i));
  fireEvent.change(screen.getByPlaceholderText(/Email/i), {
    target: { value: "testing@gmail.com" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Password/i), {
    target: { value: "testing" },
  });
  fireEvent.click(screen.getByText(/Submit/i));

  // Wait for clubs page to load after successful login
  // await waitFor(() => screen.getByText(/Community Clubs/i));

  // Create a club called "testing"
  fireEvent.click(screen.getByText(/Create Club/i));
  fireEvent.change(screen.getByPlaceholderText(/Club Name/i), {
    target: { value: "testing" },
  });
  fireEvent.click(screen.getByText(/Submit/i));

  // Wait for the club dashboard page to load
  await waitFor(() => screen.getByText(/testing/i));

  // Add a movie called "testing" on the next Friday at 8:00 PM
  const nextFriday = getNextFriday();
  const dateString = nextFriday.toISOString().split("T")[0];
  const timeString = "20:00";

  fireEvent.click(screen.getByText(/Add Movie/i));
  fireEvent.change(screen.getByPlaceholderText(/Movie Title/i), {
    target: { value: "testing" },
  });
  fireEvent.change(screen.getByLabelText(/Date/i), {
    target: { value: dateString },
  });
  fireEvent.change(screen.getByLabelText(/Time/i), {
    target: { value: timeString },
  });
  fireEvent.click(screen.getByText(/Submit/i));

  // Wait for the movie to be added to the club's schedule
  await waitFor(() => screen.getByText(/testing/i));
});

function getNextFriday() {
  const today = new Date();
  const nextFriday = new Date(today);
  nextFriday.setDate(today.getDate() + ((5 - today.getDay()) % 7) + 1);
  return nextFriday;
}
