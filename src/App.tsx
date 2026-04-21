import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "./constants/queryClient";
import { MainLayout } from "./layouts/MainLayout/MainLayout";
import { AppRoutes } from "./routes/AppRoutes";

import "./App.module.scss";

const App = () => {
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <MainLayout>
            <AppRoutes />
          </MainLayout>
        </BrowserRouter>
      </QueryClientProvider>
    </CookiesProvider>
  );
};

export default App;
