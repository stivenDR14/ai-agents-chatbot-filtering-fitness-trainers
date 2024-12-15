"use client";
import { createTheme } from "@mui/material/styles";

import localFont from "next/font/local";

const lexend = localFont({
  src: [
    {
      path: "../app/fonts/Lexend-Black.ttf",
      weight: "700",
      style: "black",
    },
    {
      path: "../app/fonts/Lexend-Bold.ttf",
      weight: "500",
      style: "bold",
    },
    {
      path: "../app/fonts/Lexend-ExtraBold.ttf",
      weight: "600",
      style: "extra-bold",
    },
    {
      path: "../app/fonts/Lexend-ExtraLight.ttf",
      weight: "200",
      style: "extra-light",
    },
    {
      path: "../app/fonts/Lexend-Light.ttf",
      weight: "300",
      style: "light",
    },
    {
      path: "../app/fonts/Lexend-Regular.ttf",
      weight: "400",
      style: "regular",
    },
  ],
});

const typografyTheme = {
  typography: {
    fontFamily: lexend.style.fontFamily,
  },
};

export const customThemeYounnger = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: "#89A2FF",
      main: "#D3E1FF",
      dark: "#9CFECE",
      contrastText: "#383838",
    },
    secondary: {
      light: "#8AEEEC",
      main: "#EDFFFF",
      dark: "#290BB2",
      contrastText: "#424FEA",
    },
    background: {
      default: "#EDEDED",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#141414",
      secondary: "#383838",
    },
    error: {
      main: "#290BB2",
    },
    warning: {
      main: "#424FEA",
    },
    info: {
      main: "#89A2FF",
    },
    success: {
      main: "#9CFECE",
    },
    common: {
      black: "#141414",
      white: "#EDEDED",
    },
  },
  ...typografyTheme,
});

export const customThemeGeneral = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#272727",
      contrastText: "#d4aa7d",
    },
    secondary: {
      main: "#90a9b7",
    },
    background: {
      default: "#d2d8b3",
      paper: "#efd09e",
    },
    text: {
      primary: "#141414",
      secondary: "#383838",
    },
    error: {
      main: "#EBA6A9",
    },
    warning: {
      main: "#FFC6AC",
    },
    info: {
      main: "#C4A29E",
    },
    success: {
      main: "#5A7D7C",
    },
    common: {
      black: "#141414",
      white: "#EDEDED",
    },
  },
  ...typografyTheme,
});
