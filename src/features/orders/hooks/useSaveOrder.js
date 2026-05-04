import { useAdminStore } from "../../users/store/adminStore";
import { toast } from "react-hot-toast";

export const useSaveOrder = () => {
    const saveOrderAction = useAdminStore((state) => state.saveOrder);

    const saveOrder = async (data) => {
        try {
            const formData = new FormData();
            formData.append("clientName", data.clientName);
            formData.append("total", data.total);
            formData.append("status", data.status);
            formData.append("location", data.location);
            if (data.image) formData.append("image", data.image);

            await saveOrderAction(formData);
            toast.success("Orden creada correctamente");
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error al crear la orden");
            return false;
        }
    };

    return { saveOrder };
};