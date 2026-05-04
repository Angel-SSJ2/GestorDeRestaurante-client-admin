import { useAdminStore } from "../../users/store/adminStore";
import { toast } from "react-hot-toast";

export const useSaveRestaurant = () => {
    const saveRestaurantAction = useAdminStore((state) => state.saveRestaurant);

    const saveRestaurant = async (data) => {
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("address", data.address);
            formData.append("phone", data.phone);
            formData.append("schedule", data.schedule);
            formData.append("category", data.category);
            if (data.image) formData.append("image", data.image);

            await saveRestaurantAction(formData);
            toast.success("Sucursal registrada exitosamente");
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error al registrar sucursal");
            return false;
        }
    };

    return { saveRestaurant };
};