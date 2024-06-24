"use client";
import React from "react";
import DeleteNetworkModal from "./delete-network-modal";
import RegisterParachainInfoModal from "./register-parachain-modal";
import NodeDetailsModal from "./node-details-modal";

const ModalProvider = () => {
  return (
    <>
      {/* Register modals here */}
      <DeleteNetworkModal />
      <RegisterParachainInfoModal />
      <NodeDetailsModal />
    </>
  );
};

export default ModalProvider;
