import { useEffect, useState } from "react";
import { useAdminStore } from "../../users/store/adminStore";
import { Spinner } from "../../auth/components/Spinner";
import { BillingModal } from "./Billings.Modal";

export const Billings = () => {
    const { billings = [], restaurants = [], getBillings, getRestaurants, getOrders } = useAdminStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter, setFilter] = useState("todos");
    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                // Cargamos facturas, restaurantes y órdenes para tener todo sincronizado
                await Promise.all([getBillings(), getRestaurants(), getOrders()]);
            } catch (err) {
                console.error("Error loading initial billing data:", err);
            } finally {
                setInitialLoading(false);
            }
        };
        loadInitialData();
    }, []);

    const getPaymentBadge = (method) => {
        const styles = {
            'EFECTIVO': 'bg-emerald-100 text-emerald-700 border-emerald-200',
            'TARJETA': 'bg-purple-100 text-purple-700 border-purple-200',
            'TRANSFERENCIA': 'bg-blue-100 text-blue-700 border-blue-200'
        };
        return styles[method?.toUpperCase()] || 'bg-gray-100 text-gray-700';
    };

    // Filtrar facturas por sucursal de la orden asociada
    const filteredBillings = filter === "todos" 
        ? billings 
        : billings.filter(bill => {
            const resId = bill.order?.restaurant?._id || bill.order?.restaurant;
            return resId === filter;
        });

    if (initialLoading) return <Spinner />;

    return (
        <div className="p-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-main-blue">Facturación</h1>
                    <p className="text-gray-500 text-sm">Registro de pagos y comprobantes de Urban Central</p>
                </div>

                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-main-blue px-6 py-2.5 rounded-lg text-white font-bold hover:scale-105 transition-all shadow-lg flex items-center gap-2 hover:bg-blue-700"
                >
                    <span className="text-xl">+</span> Generar Factura
                </button>
            </div>

            {/* SECCIÓN DE FILTROS POR SUCURSAL */}
            <div className="flex flex-wrap gap-3 mb-10 overflow-x-auto pb-2">
                <button
                    onClick={() => setFilter("todos")}
                    className={`px-5 py-2 rounded-full font-bold text-sm transition-all shadow-sm border-2
                        ${filter === "todos" 
                            ? "bg-main-blue border-main-blue text-white shadow-main-blue/20" 
                            : "bg-white border-gray-100 text-gray-500 hover:border-main-blue/30"}`}
                >
                    Todas las Sedes
                </button>
                {restaurants.map((res) => (
                    <button
                        key={res._id}
                        onClick={() => setFilter(res._id)}
                        className={`px-5 py-2 rounded-full font-bold text-sm transition-all shadow-sm border-2 whitespace-nowrap
                            ${filter === res._id 
                                ? "bg-main-blue border-main-blue text-white shadow-main-blue/20" 
                                : "bg-white border-gray-100 text-gray-500 hover:border-main-blue/30"}`}
                    >
                        {res.name}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="p-4 text-xs font-black text-gray-400 uppercase">Cliente / Orden</th>
                                <th className="p-4 text-xs font-black text-gray-400 uppercase">Sede</th>
                                <th className="p-4 text-xs font-black text-gray-400 uppercase">Monto Pagado</th>
                                <th className="p-4 text-xs font-black text-gray-400 uppercase">Método</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredBillings.length > 0 ? (
                                filteredBillings.map((bill) => (
                                    <tr key={bill._id} className="hover:bg-emerald-50/10 transition text-sm">
                                        <td className="p-4">
                                            <p className="font-bold text-gray-800">
                                                {bill.order?.user?.name || bill.clientName || 'C/F'}
                                            </p>
                                            <p className="text-[10px] text-emerald-600 font-bold uppercase">
                                                Orden #{bill.order?._id?.slice(-5) || 'N/A'}
                                            </p>
                                        </td>
                                        <td className="p-4 text-xs font-semibold text-gray-500">
                                            {bill.order?.restaurant?.name || 'Sede Principal'}
                                        </td>
                                        <td className="p-4 font-black text-gray-700 text-lg">
                                            Q {(bill.amount || 0).toFixed(2)}
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black border ${getPaymentBadge(bill.paymentMethod)}`}>
                                                {bill.paymentMethod || 'NO ESPECIFICADO'}
                                            </span>
                                        </td>
                                        
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-400 italic">
                                        No hay facturas registradas para esta sede.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <BillingModal onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    );
};