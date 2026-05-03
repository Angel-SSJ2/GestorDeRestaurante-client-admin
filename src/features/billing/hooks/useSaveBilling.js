import { useAdminStore } from "../../users/store/adminStore";
import { toast } from "react-hot-toast";

export const useSaveBilling = () => {
    const saveBillingAction = useAdminStore((state) => state.saveBilling);

    const saveBilling = async (data) => {
        try {
            const formData = new FormData();
            formData.append("order", data.orderId);
            formData.append("paymentMethod", data.paymentMethod);
            
            if (data.receiptPhoto) {
                formData.append("image", data.receiptPhoto);
            }

            await saveBillingAction(formData);
            toast.success("Factura generada y orden actualizada");
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error al procesar el pago");
            return false;
        }
    };

    return { saveBilling };
};