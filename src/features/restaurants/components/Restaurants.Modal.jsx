import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAdminStore } from "../../users/store/adminStore";
import { useSaveRestaurant } from "../hooks/useSaveRestaurant";
import { Spinner } from "../../auth/components/Spinner.jsx";
import { showSuccess, showError } from "../../../shared/utils/toast.js";

export const RestaurantModal = ({ isOpen, onClose, restaurant }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const { saveRestaurant } = useSaveRestaurant();
  const getRestaurants = useAdminStore((state) => state.getRestaurants);
  const loading = useAdminStore((state) => state.loading);

  const [preview, setPreview] = useState(null);

  // Efecto para cargar datos al editar
  useEffect(() => {
    if (isOpen) {
      if (restaurant) {
        reset({
          name: restaurant.name,
          address: restaurant.address,
          phone: restaurant.phone,
          schedule: restaurant.schedule,
          category: restaurant.category,
        });
        setPreview(`https://res.cloudinary.com/dxnjptc1x/image/upload${restaurant.image}`); 
      } else {
        reset({
          name: "",
          address: "",
          phone: "",
          schedule: "",
          category: "",
          image: null,
        });
        setPreview(null);
      }
    }
  }, [isOpen, restaurant, reset]);

  // Efecto para la previsualización del logo seleccionado
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "image" && value.image && value.image.length > 0) {
        setPreview(URL.createObjectURL(value.image[0]));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data) => {
    try {
      await saveRestaurant(data, restaurant?._id);
      showSuccess(
        restaurant
          ? "Restaurante actualizado correctamente"
          : "Restaurante creado correctamente"
      );
      getRestaurants();
      onClose();
    } catch (error) {
      showError("Error al procesar la solicitud");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg md:max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* HEADER */}
        <div
          className="p-4 sm:p-5 text-white sticky top-0 z-10"
          style={{ background: "linear-gradient(90deg, var(--main-blue) 0%, #1956a3 100%)" }}
        >
          <h2 className="text-xl sm:text-2xl font-bold">
            {restaurant ? "Editar Restaurante" : "Nuevo Restaurante"}
          </h2>
          <p className="text-xs sm:text-sm opacity-80">
            {restaurant ? "Actualiza los datos de la sucursal" : "Agrega una nueva sucursal al sistema"}
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6 space-y-5 overflow-y-auto">
          
          {/* PREVIEW LOGO */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-2xl bg-gray-100 border flex items-center justify-center overflow-hidden shadow-inner">
              {preview ? (
                <img src={preview} className="w-full h-full object-cover" alt="Preview" />
              ) : (
                <span className="text-gray-400 text-xs text-center px-2">Sin logo</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nombre */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-semibold text-gray-700 mb-1">Nombre</label>
              <input
                className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 focus:border-blue-500 outline-none transition"
                {...register("name", { required: "El nombre es obligatorio" })}
              />
              {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
            </div>

            {/* Teléfono */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">Teléfono</label>
              <input
                className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 focus:border-blue-500 outline-none transition"
                {...register("phone", { required: "El teléfono es obligatorio" })}
              />
              {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>}
            </div>

            {/* Categoría */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">Categoría</label>
              <input
                className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 focus:border-blue-500 outline-none transition"
                {...register("category", { required: "La categoría es obligatoria" })}
              />
            </div>

            {/* Dirección */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-semibold text-gray-700 mb-1">Dirección</label>
              <input
                className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 focus:border-blue-500 outline-none transition"
                {...register("address", { required: "La dirección es obligatoria" })}
              />
            </div>

            {/* Horario */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-semibold text-gray-700 mb-1">Horario</label>
              <input
                className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 focus:border-blue-500 outline-none transition"
                placeholder="Ej: 08:00 - 20:00"
                {...register("schedule")}
              />
            </div>

            {/* Imagen/Logo */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-semibold text-gray-700 mb-1">Logo del Restaurante</label>
              <input
                type="file"
                accept="image/*"
                className="w-full px-3 py-2 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:border-blue-400 transition cursor-pointer"
                {...register("image")}
              />
            </div>
          </div>

          {/* ACCIONES */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg text-white font-medium transition shadow"
              style={{ background: "linear-gradient(90deg, var(--main-blue) 0%, #1956a3 100%)" }}
            >
              {loading ? <Spinner small /> : restaurant ? "Guardar cambios" : "Crear restaurante"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};