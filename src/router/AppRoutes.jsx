import {Routes, Route} from "react-router-dom";
import { AuthPage } from "../features/auth/pages/AuthPage.jsx";
import { DashboardPage } from "../app/layouts/DashboardPage.jsx";

export const AppRoutes = () => {
    return(
        <Routes>
            {/*Publicas*/}
            <Route path="/" element={<AuthPage />} />

            {/*Protegido por Roles*/}
            <Route path="/dashboard/*" element={<DashboardPage />} />

        </Routes>
    );
}