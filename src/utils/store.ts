import { create } from 'zustand';

interface AppState {
  isMenuOpen: boolean;
  isTransitioning: boolean;
  isSingularity: boolean;
  toggleMenu: () => void;
  setTransitioning: (val: boolean) => void;
  triggerSingularity: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  isMenuOpen: false,
  isTransitioning: false,
  isSingularity: false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  setTransitioning: (val) => set({ isTransitioning: val }),
  triggerSingularity: () => {
    set({ isSingularity: true });
    setTimeout(() => {
      set({ isSingularity: false });
    }, 4000); // 4 seconds of singularity before restoring
  },
}));

// Backwards compatibility for raw store subscriptions (outside React)
export const transitionStore = {
  subscribe: (listener: (state: boolean) => void) => {
    return useAppStore.subscribe((state) => listener(state.isTransitioning));
  },
  getSnapshot: () => useAppStore.getState().isTransitioning,
  setTransitioning: (val: boolean) => useAppStore.getState().setTransitioning(val)
};
