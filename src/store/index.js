import create from "zustand";

const useStore = create((set) => ({
  target: null,
  setTarget: (target) => set({ target }),
}));

export default useStore;
