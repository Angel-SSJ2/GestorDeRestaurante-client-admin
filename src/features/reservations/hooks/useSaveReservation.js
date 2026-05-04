import { useAdminStore } from "../../users/store/adminStore";
import { toast } from "react-hot-toast";

export const useSaveReservation = () => {
    const saveReservationAction = useAdminStore((state) => state.saveReservation);

    const saveReservation = async (data) => {
        try {
            const formData = new FormData();
            formData.append("sucursalId", data.sucursalId);
            formData.append("clientName", data.clientName);
            formData.append("date", data.date);
            formData.append("pax", data.pax);
            if (data.image) formData.append("image", data.image);

            await saveReservationAction(formData);
            toast.success("Reservación confirmada");
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error al crear reservación");
            return false;
        }
    };

    return { saveReservation };
};