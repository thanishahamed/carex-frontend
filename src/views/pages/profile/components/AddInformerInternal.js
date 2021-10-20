import { CModal, CModalBody, CModalHeader } from "@coreui/react";
import React from "react";
import AddInformer from "src/views/informer/AddInformer";

export default function AddInformerInternal(props) {
  return (
    <div>
      <CModal
        show={props.addInformerModal}
        onClose={() => props.setAddInformerModal(false)}
        closeOnBackdrop={false}
      >
        <CModalHeader closeButton> Add Informer </CModalHeader>
        <CModalBody>
          <AddInformer />
        </CModalBody>
      </CModal>
    </div>
  );
}
