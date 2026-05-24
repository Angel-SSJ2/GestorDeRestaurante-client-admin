import { useAdminStore } from "../../users/store/adminStore";
import { toast } from "react-hot-toast";

export const useSaveReservation = () => {
    const saveReservationAction = useAdminStore((state) => state.saveReservation);

    const saveReservation = async (data, id) => {
        try {
            const payload = {
                restaurant: data.restaurant,
                table: data.table,
                date: data.date,
                guests: Number(data.guests || data.pax),
                user: data.user,
                status: data.status || 'pendiente'
            };

            await saveReservationAction(payload, id);
            toast.success("Reservación guardada con éxito");
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error al guardar reservación");
            return false;
        }
    };

    return { saveReservation };
};