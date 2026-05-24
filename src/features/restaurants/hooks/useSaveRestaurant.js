import { useAdminStore } from "../../users/store/adminStore";
import { toast } from "react-hot-toast";

export const useSaveRestaurant = () => {
    const saveRestaurantAction = useAdminStore((state) => state.saveRestaurant);

    const saveRestaurant = async (data, id) => {
        try {
            const formData = new FormData();
            
            if (id) {
                formData.append("id", id);
            } else if (data.id || data._id) {
                formData.append("id", data.id || data._id);
            }

            formData.append("name", data.name);
            formData.append("address", data.address);
            formData.append("phone", data.phone);
            formData.append("schedule", data.schedule);
            formData.append("category", data.category);

            if (data.image && data.image[0] instanceof File) {
                formData.append("image", data.image[0]);
            }
            await saveRestaurantAction(formData);

            toast.success("Operación exitosa");
            return true;
        } catch (error) {
            console.error("ERROR COMPLETO:", error);
            console.log("DATA:", error.response?.data);
            console.log("STATUS:", error.response?.status);
            let errorMsg = error.response?.data?.error || error.response?.data?.message || "Error al procesar la sucursal";
            
            if (typeof errorMsg === 'string' && errorMsg.includes("E11000") && errorMsg.includes("name")) {
                errorMsg = `El nombre de restaurante "${data.name}" ya se encuentra registrado. Por favor, usa otro.`;
            }
            
            toast.error(errorMsg);
            return false;
        }
    };

    return { saveRestaurant };
};