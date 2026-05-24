import { useAdminStore } from "../../users/store/adminStore";
import { toast } from "react-hot-toast";

export const useSaveOrder = () => {
    const saveOrderAction = useAdminStore((state) => state.saveOrder);

    const saveOrder = async (data) => {
        try {
            const payload = {
                restaurant: data.restaurant,
                user: data.user,
                items: data.items.map(item => ({
                    dish: item.dish,
                    quantity: Number(item.quantity)
                }))
            };

            await saveOrderAction(payload);
            toast.success("Orden creada correctamente");
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error al crear la orden");
            return false;
        }
    };

    return { saveOrder };
};