import React from "react";
import { render } from "@testing-library/react";
import Footer from "./Footer";
import { ThemeProvider, css } from "styled-components";
import "@testing-library/jest-dom/extend-expect";

test("renders Footer component", () => {
  const fakeTheme = {
    colors: {
      background: "rgba(255, 255, 255, 0.9)",
      gray: "#5b5b5b",
      body: "#F5F5F5",
    },
    media: {
      mobile: (...args) => css`
        @media (max-width: 450px) {
          ${css(...args)}
        }
      `,
    },
  };
  const { getByText } = render(
    <ThemeProvider theme={fakeTheme}>
      <Footer />
    </ThemeProvider>
  );
  const linkElement = getByText(
    /Copyright © 2023 Paws on Patrol. All rights reserved./i
  );
  expect(linkElement).toBeInTheDocument();
});
