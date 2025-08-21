import { create } from "zustand";

export const useDesktops = create((set) => ({
    currentDesktop: 0,
    setCurrentDesktop: (index) => set({ currentDesktop: index }),
    desktops: [
        {
            id: 0,
            terminals: [],
        },
        {
            id: 1,
            terminals: [],
        },
        {
            id: 2,
            terminals: [],
        },
        {
            id: 3,
            terminals: [],
        },
        {
            id: 4,
            terminals: [],
        },
    ],
    setDesktopTerminals: (id, terminals) => set((state) => {
        const newDesktops = state.desktops.map((desktop) => {
            if (desktop.id === id) {
                return { ...desktop, terminals };
            }
            return desktop;
        });
        return { desktops: newDesktops };
    }),
}));