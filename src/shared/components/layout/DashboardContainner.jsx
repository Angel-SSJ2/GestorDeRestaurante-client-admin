import { useState } from "react";
import { Navbar } from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import Restaurantes from "../restaurants/Restaurantes.jsx";
import Reservaciones from "../reservations/Reservaciones.jsx";
import Menus from "../menus/Menus.jsx";

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
                </main>
            </div>
        </div>
    );
};