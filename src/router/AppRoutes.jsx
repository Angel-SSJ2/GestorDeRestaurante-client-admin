import { Routes, Route } from "react-router-dom";
import { AuthPage } from "../features/auth/pages/AuthPage.jsx";
import { DashboardPage } from "../app/layouts/DashboardPage.jsx";
import { Users } from "../features/users/components/Users.jsx";
import { Inventory } from "../features/inventory/components/Inventory.jsx";
import { Billings } from "../features/billing/components/Billings.jsx";
import { Orders } from "../features/orders/components/Orders.jsx";
import { Events } from "../features/events/components/Events.jsx";
import { Reservations } from "../features/reservations/components/Reservations.jsx";
import { Tables } from "../features/tables/components/Tables.jsx";
import { Menus } from "../features/menus/components/Menus.jsx";
import { Restaurantes } from "../features/restaurants/components/Restaurants"

export const AppRoutes = () => {
    return (
        <Routes>
            {/*Publicas*/}
            <Route path="/" element={<AuthPage />} />

            <Route path="/dashboard/*" element={<DashboardPage />}>
                <Route path="restaurants" element={<Restaurantes />} />
                <Route path="reservations" element={<Reservations />} />
                <Route path="menus" element={<Menus />} />
                <Route path="tables" element={<Tables />} />
                <Route path="users" element={<Users />} />
                <Route path="orders" element={<Orders />} />
                <Route path="events" element={<Events />} />
                <Route path="billings" element={<Billings />} />
                <Route path="inventory" element={<Inventory />} />

            </Route>

        </Routes>
    );
}