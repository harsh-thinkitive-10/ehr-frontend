import "./sdk/setup";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import {
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";

import { router } from "./app/router";
import { AuthProvider } from "./features/auth/context";
import { queryClient } from "./app/queryClient";
import { theme } from "./app/theme";

import "./index.css";

// Alt-click any element to open it in the editor. Dev only.
if (import.meta.env.DEV) {
  void import("./dev/locator");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);