import { useState } from "react";
import { Navbar } from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import { Restaurantes } from "../../../features/restaurants/components/Restaurants.jsx";
import { Reservaciones } from "../../../features/reservations/components/Reservations.jsx";
import { Menus } from "../../../features/menus/components/Menus.jsx";
import { Tables } from "../../../features/tables/components/Tables.jsx";
import { Events } from "../../../features/events/components/Events.jsx";
import { Orders } from "../../../features/orders/components/Orders.jsx";
import { Billings } from "../../../features/billing/components/Billings.jsx";
import { Inventory } from "../../../features/inventory/components/Inventory.jsx";
import { Users } from "../../../features/users/components/users.jsx";

export const DashboardContainer = () => {
    const [seccion, setSeccion] = useState("restaurantes");

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="flex flex-1">
                <Sidebar setSeccion={setSeccion} />

                <main className="flex-1 p-6">
                    {seccion === "restaurantes" && <Restaurantes />}
                    {seccion === "reservaciones" && <Reservaciones />}
                    {seccion === "menus" && <Menus />}
                    {seccion === "tables" && <Tables />}
                    {seccion === "events" && <Events />}
                    {seccion === "orders" && <Orders />}
                    {seccion === "billings" && <Billings />}
                    {seccion === "inventory" && <Inventory />}
                    {seccion === "users" && <Users />}
                </main>
            </div>
        </div>
    );
};