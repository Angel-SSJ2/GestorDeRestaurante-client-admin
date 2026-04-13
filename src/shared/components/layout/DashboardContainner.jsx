import { Navbar } from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";

export const DashboardContainer = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">

                {/*Navbar*/}
                <Navbar />

                <div className="flex flex-1">
                    {/*Sidebar*/}
                    <Sidebar />
                    <main className="flex-1 p-6">
                        {/*Children*/}
                        {children || "contenido del menu"} 
                    </main>
                </div>
        </div>
    )
}