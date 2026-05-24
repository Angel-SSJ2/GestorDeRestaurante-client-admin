import { useAdminStore } from "../../users/store/adminStore";
import { toast } from "react-hot-toast";

export const useSaveTable = () => {
    const saveTableAction = useAdminStore((state) => state.saveTable);

    const saveTable = async (data, id) => {
        try {
            await saveTableAction(data, id);
            toast.success(id ? "Mesa actualizada correctamente" : "Mesa configurada correctamente");
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error al guardar la mesa");
            return false;
        }
    };

    return { saveTable };
};