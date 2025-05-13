import { create } from 'zustand';

type CollapsedState = {
  collapsed: boolean;
  toggleCollapsed: () => void;
};

export const useCollapsedStore = create<CollapsedState>((set) => ({
  collapsed: false,
  toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
}));