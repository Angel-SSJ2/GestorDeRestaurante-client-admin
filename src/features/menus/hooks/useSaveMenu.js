import { useAdminStore } from "../../users/store/adminStore";
import { toast } from "react-hot-toast";

export const useSaveMenu = () => {
    const saveMenuItemAction = useAdminStore((state) => state.saveMenuItem);

    const saveMenu = async (data) => {
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("price", data.price);
            formData.append("category", data.category);
            formData.append("description", data.description);
            if (data.image) {
                formData.append("image", data.image);
            }

            await saveMenuItemAction(formData);
            toast.success("Platillo guardado exitosamente");
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error al guardar el menú");
            return false;
        }
    };

    return { saveMenu };
};