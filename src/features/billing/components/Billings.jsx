import { useEffect, useState } from "react";
import { useAdminStore } from "../../users/store/adminStore";
import { Spinner } from "../../auth/components/Spinner";
import { BillingModal } from "./Billings.Modal";

export const Billings = () => {
    const { billings = [], loading, getBillings } = useAdminStore();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getBillings();
    }, []);

    const getPaymentBadge = (method) => {
        const styles = {
            'EFECTIVO': 'bg-emerald-100 text-emerald-700 border-emerald-200',
            'TARJETA': 'bg-purple-100 text-purple-700 border-purple-200',
            'TRANSFERENCIA': 'bg-blue-100 text-blue-700 border-blue-200'
        };
        return styles[method?.toUpperCase()] || 'bg-gray-100 text-gray-700';
    };

    if (loading && billings.length === 0) return <Spinner />;

    return (
        <div className="p-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-main-blue">Facturación</h1>
                    <p className="text-gray-500 text-sm">Registro de pagos de Urban Central</p>
                </div>

                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-900 px-6 py-2.5 rounded-lg text-white font-bold hover:scale-105 transition-transform shadow-lg flex items-center gap-2"
                >
                    <span className="text-xl">+</span> Generar Factura
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="p-4 text-xs font-black text-gray-400 uppercase">Cliente / Orden</th>
                                <th className="p-4 text-xs font-black text-gray-400 uppercase">Monto</th>
                                <th className="p-4 text-xs font-black text-gray-400 uppercase">Método</th>
                                <th className="p-4 text-xs font-black text-gray-400 uppercase">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {billings.length > 0 ? (
                                billings.map((bill) => (
                                    <tr key={bill._id} className="hover:bg-blue-50/30 transition">
                                        <td className="p-4">
                                            <p className="font-bold text-gray-800">
                                                {bill.order?.user?.username || bill.clientName || 'C/F'}
                                            </p>
                                            <p className="text-[10px] text-main-blue font-bold uppercase">
                                                Orden #{bill.order?._id?.slice(-5) || 'N/A'}
                                            </p>
                                        </td>
                                        <td className="p-4 font-black text-gray-700 text-lg">
                                            Q {(bill.amount || bill.total || 0).toFixed(2)}
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black border ${getPaymentBadge(bill.paymentMethod)}`}>
                                                {bill.paymentMethod || 'NO ESPECIFICADO'}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <button className="text-main-blue hover:underline font-bold text-sm">
                                                Ver Comprobante
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-gray-400 italic">
                                        No hay facturas registradas en el sistema.
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