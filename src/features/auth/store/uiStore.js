import { create } from "zustand";

export const useUIStore = create((set) => ({
    modal: null, 
    confirm: null, 

    OpenModal: (title, message, onClose) => set({
        modal: { title, message, onClose }
    }),

    CloseModal: () => set({ modal: null }),
    
    openConfirm: (title, message, onConfirm, onClose) => set({
        confirm: { title, message, onConfirm, onClose }
    }),

    closeConfirm: () => set({ confirm: null })
}));    