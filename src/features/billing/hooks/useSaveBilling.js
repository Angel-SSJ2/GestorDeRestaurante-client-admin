import { useAdminStore } from "../../users/store/adminStore";
import { toast } from "react-hot-toast";

export const useSaveBilling = () => {
    const saveBillingAction = useAdminStore((state) => state.saveBilling);

    const saveBilling = async (data) => {
        try {
            const payload = {
                order: data.orderId,
                paymentMethod: data.paymentMethod,
                amount: Number(data.amount)
            };

            await saveBillingAction(payload);
            toast.success("Factura generada y orden actualizada");
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error al procesar el pago");
            return false;
        }
    };

    return { saveBilling };
};