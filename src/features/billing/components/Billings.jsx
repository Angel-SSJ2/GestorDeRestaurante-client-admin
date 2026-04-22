import { useState } from "react";
import { Spinner } from "../../auth/components/Spinner";
import { BillingModal } from "./Billings.Modal";

export const Billings = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const loading = false;

    // Estilo para los métodos de pago
    const getPaymentBadge = (method) => {
        const styles = {
            'EFECTIVO': 'bg-emerald-100 text-emerald-700 border-emerald-200',
            'TARJETA': 'bg-purple-100 text-purple-700 border-purple-200',
            'TRANSFERENCIA': 'bg-blue-100 text-blue-700 border-blue-200'
        };
        return styles[method] || 'bg-gray-100 text-gray-700';
    };

    if (loading) return <Spinner />;

    return (
        <div className="p-4">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-main-blue">Facturación</h1>
                    <p className="text-gray-500 text-sm">Registro de pagos y comprobantes emitidos</p>
                </div>

                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-emerald-600 px-6 py-2.5 rounded-lg text-white font-bold hover:scale-105 transition-transform shadow-lg flex items-center gap-2"
                >
                    <span>💰</span> Generar Factura
                </button>
            </div>

            {/* TABLA DE FACTURAS (Más eficiente para finanzas) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="p-4 text-xs font-black text-gray-400 uppercase">Cliente / Orden</th>
                                <th className="p-4 text-xs font-black text-gray-400 uppercase">Monto</th>
                                <th className="p-4 text-xs font-black text-gray-400 uppercase">Método</th>
                                <th className="p-4 text-xs font-black text-gray-400 uppercase">Ubicación</th>
                                <th className="p-4 text-xs font-black text-gray-400 uppercase">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            <tr className="hover:bg-blue-50/30 transition">
                                <td className="p-4">
                                    <p className="font-bold text-gray-800">Juan Pérez</p>
                                    <p className="text-[10px] text-main-blue font-bold uppercase">Orden #A-102</p>
                                </td>
                                <td className="p-4 font-black text-gray-700 text-lg">Q 150.00</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black border ${getPaymentBadge('TARJETA')}`}>
                                        TARJETA
                                    </span>
                                </td>
                                <td className="p-4">
                                    <p className="text-xs text-gray-500 italic">Urban Central - zona 16</p>
                                </td>
                                <td className="p-4">
                                    <button className="text-main-blue hover:underline font-bold text-sm">Ver Comprobante</button>
                                </td>
                            </tr>
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