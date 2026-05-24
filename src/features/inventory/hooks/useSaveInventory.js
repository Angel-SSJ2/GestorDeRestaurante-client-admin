import { useAdminStore } from "../../users/store/adminStore";
import { toast } from "react-hot-toast";

export const useSaveInventory = () => {
    const { saveInventory, updateInventory, restockInventory } = useAdminStore();

    const saveInventoryItem = async (data) => {
        try {
            await saveInventory(data);
            toast.success("Insumo registrado correctamente");
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error al registrar el insumo");
            return false;
        }
    };

    const updateInventoryItem = async (id, data) => {
        try {
            await updateInventory(id, data);
            toast.success("Insumo actualizado correctamente");
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error al actualizar el insumo");
            return false;
        }
    };

    const restockInventoryItem = async (id, quantityToAdd) => {
        try {
            await restockInventory(id, quantityToAdd);
            toast.success("Reabastecimiento completado correctamente");
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error al reabastecer el insumo");
            return false;
        }
    };

    return { saveInventoryItem, updateInventoryItem, restockInventoryItem };
};