import { useAdminStore } from "../../users/store/adminStore";
import { toast } from "react-hot-toast";

export const useSaveEvent = () => {
    const saveEventAction = useAdminStore((state) => state.saveEvent);

    const saveEvent = async (data, id) => {
        try {
            const formData = new FormData();
            
            formData.append('name', data.name);
            formData.append('description', data.description);
            formData.append('type', data.type);
            formData.append('date', data.date);
            formData.append('price', data.price);
            formData.append('capacity', data.capacity);
            formData.append('restaurant', data.restaurant);

            if (data.image instanceof File) {
                formData.append('image', data.image);
            }

            await saveEventAction(formData, id);
            toast.success(id ? "Evento actualizado correctamente" : "Evento creado correctamente");
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error al guardar el evento");
            return false;
        }
    };

    return { saveEvent };
};