import { useAdminStore } from "../../users/store/adminStore";
import { toast } from "react-hot-toast";

export const useSaveTable = () => {
    const saveTableAction = useAdminStore((state) => state.saveTable);

    const saveTable = async (data) => {
        try {
            
            await saveTableAction(data);
            toast.success("Mesa configurada correctamente");
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error al crear la mesa");
            return false;
        }
    };

    return { saveTable };
};