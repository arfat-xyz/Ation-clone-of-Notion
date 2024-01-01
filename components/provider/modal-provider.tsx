"use client";

import React, { useEffect, useState } from "react";
import SettingsModal from "../modals/settings-modal";
import CoverImageModal from "../modals/cover-image-modal";

const ModalProvider = () => {
  const [isMouted, setIsMouted] = useState(false);
  useEffect(() => setIsMouted(true), []);
  if (!isMouted) null;
  return (
    <>
      <SettingsModal />
      <CoverImageModal />
    </>
  );
};

export default ModalProvider;
