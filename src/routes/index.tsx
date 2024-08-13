import AppLayout from "@/layouts/AppLayout";
import Dashboard from "@/pages/Dashboard/Dashboard";
import DraftFileTDTD from "@/pages/DraftFileTDTD/DraftFileTDTD";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

export interface IRoute {
  path: string;
  element?: JSX.Element;
  loader?: () => void;
}

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <AppLayout>
              <Outlet />
            </AppLayout>
          }
        >
          <Route path={"/dashboard"} element={<Dashboard />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/soan-hoso-TDTD/:action" element={<DraftFileTDTD />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
