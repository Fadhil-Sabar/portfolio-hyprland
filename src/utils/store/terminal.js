import { create } from "zustand";

export const useTerminal = create((set) => ({
    history: [],
    input: [],
    focusedIndex: 0,
    setFocusedIndex: (index) => set({ focusedIndex: index }),
    setHistory: (index, newHistory) => set((state) => {
        const newHistories = [...state.history];
        newHistories[index] = newHistory;
        return { history: newHistories };
    }),
    setInput: (index, newInput) => set((state) => {
        const newInputs = [...state.input];
        newInputs[index] = newInput;
        return { input: newInputs };
    }),
    addHistory: (index, command, response) => set((state) => {
        const newHistories = [...state.history];
        if (!newHistories[index]) {
            newHistories[index] = [];
        }
        newHistories[index].push({ command, response });
        return { history: newHistories };
    }),
    clearHistory: (index) => set((state) => {
        const newHistories = [...state.history];
        newHistories[index] = [];
        return { history: newHistories };
    }),
    clearAllHistories: () => set({ history: [], input: [] }),
    clearLastHistory: () => set((state) => {
        const newHistories = [...state.history];
        if (newHistories[state.focusedIndex] && newHistories[state.focusedIndex].length > 0) {
            newHistories[state.focusedIndex] = [];
        }
        return { history: newHistories };
    }),
    addInput: (index, char) => set((state) => {
        const newInputs = [...state.input];
        if (!newInputs[index]) {
            newInputs[index] = '';
        }
        newInputs[index] += char;
        return { input: newInputs };
    }),
    removeLastInput: (index) => set((state) => {
        const newInputs = [...state.input];
        if (newInputs[index]) {
            newInputs[index] = newInputs[index].slice(0, -1);
        }
        return { input: newInputs };
    }),
    resetInput: (index) => set((state) => {
        const newInputs = [...state.input];
        newInputs[index] = '';
        return { input: newInputs };
    }),
}));