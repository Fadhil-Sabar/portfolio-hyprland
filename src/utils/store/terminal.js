import { create } from "zustand";

export const useTerminal = create((set) => ({
    history: [],
    input: [],
    focusedIndex: null,
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
        const createdAt = new Date().toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        newHistories[index].push({ command, response, createdAt, historyIndex: null });
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
    replaceCurrentInput: (direction) => set((state) => {
        const newInputs = [...state.input];
        const newHistory = [...state.history];

        const currentHistory = newHistory[state.focusedIndex] || [];

        if(currentHistory.length === 0) return { input: newInputs };

        let currentHistoryIndex = currentHistory.findIndex(d => d.historyIndex !== null);
        let tempIndex = currentHistoryIndex;

        if (currentHistoryIndex === - 1) {
            currentHistoryIndex = currentHistory.length;
        }
        
        if(direction === 'up'){
            currentHistory[tempIndex === -1 ? currentHistoryIndex - 1 : tempIndex].historyIndex = null
            currentHistoryIndex = Math.max(0, currentHistoryIndex - 1);
        } else if(direction === 'down'){
            if(tempIndex === -1) {
                return { input: newInputs };
            }

            currentHistory[currentHistoryIndex].historyIndex = null
            if(currentHistoryIndex === currentHistory.length - 1) {
                newInputs[state.focusedIndex] = '';
                return { input: newInputs };
            }
            currentHistoryIndex = Math.min(currentHistory.length - 1, currentHistoryIndex + 1);
        }

        currentHistory[currentHistoryIndex].historyIndex = true;

        newInputs[state.focusedIndex] = currentHistory[currentHistoryIndex]?.command

        return { input: newInputs };
    })
}));