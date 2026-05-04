import { useAdminStore } from "../../users/store/adminStore";
import { toast } from "react-hot-toast";

export const useSaveInventory = () => {
    const saveInventoryItemAction = useAdminStore((state) => state.saveInventoryItem);

    const saveInventoryItem = async (data) => {
        try {
            const formData = new FormData();
            formData.append("productName", data.productName);
            formData.append("quantity", data.quantity);
            formData.append("unit", data.unit);
            formData.append("location", data.location);
            formData.append("isActive", data.isActive);

            await saveInventoryItemAction(formData);
            toast.success("Insumo registrado correctamente");
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error al registrar el insumo");
            return false;
        }
    };

    return { saveInventoryItem };
};