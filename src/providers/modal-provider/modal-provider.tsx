"use client";
import React from "react";
import DeleteNetworkModal from "./delete-network-modal";
import RegisterParachainInfoModal from "./register-parachain-modal";

const ModalProvider = () => {
  return (
    <>
      {/* Register modals here */}
      <DeleteNetworkModal />
      <RegisterParachainInfoModal />
    </>
  );
};

export default ModalProvider;
