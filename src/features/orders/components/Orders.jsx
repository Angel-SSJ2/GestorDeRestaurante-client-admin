import { useEffect, useState } from "react";
import { useAdminStore } from "../../users/store/adminStore";
import { Spinner } from "../../auth/components/Spinner";
import { OrdersModal } from "./Orders.Modal";

export const Orders = () => {
    const { orders, restaurants, getOrders, getRestaurants, updateOrderStatus } = useAdminStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter, setFilter] = useState("todos");
    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                await Promise.all([getOrders(), getRestaurants()]);
            } catch (err) {
                console.error("Error loading initial data:", err);
            } finally {
                setInitialLoading(false);
            }
        };
        loadInitialData();
    }, []);

    const getStatusColor = (status) => {
        const normalized = status?.toString().toUpperCase();
        switch (normalized) {
            case 'PENDIENTE': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'PREPARANDO': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'ENTREGADO': return 'bg-green-100 text-green-700 border-green-200';
            case 'CANCELADO': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    // Filtrar los items según la sucursal seleccionada
    const filteredOrders = filter === "todos" 
        ? orders 
        : orders.filter(order => (order.restaurant?._id || order.restaurant) === filter);

    if (initialLoading) return <Spinner />;

    return (
        <div className="p-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-main-blue">Gestión de Órdenes</h1>
                    <p className="text-gray-500 text-sm">Monitoreo de pedidos y estados en tiempo real</p>
                </div>

                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-main-blue px-6 py-2.5 rounded-lg text-white font-bold hover:scale-105 transition-all shadow-lg"
                >
                    + Nueva Orden
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

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredOrders.map((order) => (
                    <div key={order._id} className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all ${order.status === 'CANCELADO' && 'opacity-60 grayscale'}`}>
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-[10px] font-black text-main-blue uppercase tracking-widest mb-1">Cliente</p>
                                    <h3 className="text-xl font-bold text-gray-800 leading-tight">{order.user?.name || "Cliente Registrado"}</h3>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-gray-400 uppercase mb-1 text-center">Total</p>
                                    <span className="text-2xl font-black text-main-blue block">Q {order.totalPrice ? order.totalPrice.toFixed(2) : "0.00"}</span>
                                </div>
                            </div>

                            <div className="space-y-3 mb-4">
                                <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-2 rounded-lg border border-gray-100">
                                    <span className="mr-3 text-lg">📍</span>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-gray-400 leading-none">Sede</p>
                                        <p className="font-semibold text-gray-700 text-xs mt-1">{order.restaurant?.name || "Sucursal"}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-black border uppercase ${getStatusColor(order.status)}`}>
                                        {order.status || 'PENDIENTE'}
                                    </span>
                                    <span className="text-[11px] text-gray-400 font-medium">
                                        {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>

                            {/* DETALLE DE PLATOS (CARRITO) */}
                            {order.items && order.items.length > 0 && (
                                <div className="space-y-1.5 mb-5 border-t border-gray-50 pt-3">
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Detalle del Pedido</p>
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex justify-between text-xs text-gray-600">
                                            <span>{item.dish?.name || "Plato"} <span className="font-bold text-main-blue">x{item.quantity}</span></span>
                                            <span className="font-semibold text-gray-800">Q {((item.dish?.price || 0) * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="flex gap-2 pt-4 border-t border-gray-50">
                                {order.status === 'PENDIENTE' && (
                                    <button 
                                        onClick={() => updateOrderStatus(order._id, 'PREPARANDO')}
                                        className="flex-1 py-2 rounded-xl bg-yellow-500 text-white font-bold hover:bg-yellow-600 transition text-xs uppercase shadow-sm"
                                    >
                                        👨‍🍳 Preparar
                                    </button>
                                )}
                                {order.status === 'PREPARANDO' && (
                                    <button 
                                        onClick={() => updateOrderStatus(order._id, 'ENTREGADO')}
                                        className="flex-1 py-2 rounded-xl bg-main-blue text-white font-bold hover:bg-blue-700 transition text-xs uppercase shadow-sm"
                                    >
                                        ✅ Entregar
                                    </button>
                                )}
                                {order.status !== 'ENTREGADO' && order.status !== 'CANCELADO' && (
                                    <button 
                                        onClick={() => updateOrderStatus(order._id, 'CANCELADO')}
                                        className="py-2 px-3 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition text-xs font-bold uppercase"
                                    >
                                        Anular
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredOrders.length === 0 && (
                <div className="text-center py-20 text-gray-400">
                    <p className="text-xl">No hay órdenes registradas en esta sede</p>
                </div>
            )}

            {isModalOpen && <OrdersModal onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};