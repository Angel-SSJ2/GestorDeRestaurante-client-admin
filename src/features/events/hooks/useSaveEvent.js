import { useAdminStore } from "../../users/store/adminStore";
import { toast } from "react-hot-toast";

export const useSaveEvent = () => {
    const saveEventAction = useAdminStore((state) => state.saveEvent);

    const saveEvent = async (data) => {
        try {
            const formData = new FormData();
            formData.append("eventName", data.eventName);
            formData.append("eventDate", data.eventDate);
            formData.append("location", data.location);
            formData.append("isActive", data.isActive);
            
            if (data.photoFile) {
                formData.append("image", data.photoFile);
            }

            await saveEventAction(formData);
            toast.success("Evento guardado exitosamente");
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error al guardar el evento");
            return false;
        }
    };

    return { saveEvent };
};