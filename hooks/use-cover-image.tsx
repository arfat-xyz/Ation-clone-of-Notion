interface CoverImageProps {
  url?: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onReplace: (url: string) => void | string;
}
import React from "react";
import { create } from "zustand";

const useCoverImage = create<CoverImageProps>((set) => ({
  url: undefined,
  isOpen: false,
  onOpen: () => set({ isOpen: true, url: undefined }),
  onClose: () => set({ isOpen: false, url: undefined }),
  onReplace: (url: string) => set({ isOpen: true, url }),
}));

export default useCoverImage;
