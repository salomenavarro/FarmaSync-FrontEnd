import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UiState = {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
};

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    }),
    { name: "farmasync-ui", storage: createJSONStorage(() => localStorage) },
  ),
);
