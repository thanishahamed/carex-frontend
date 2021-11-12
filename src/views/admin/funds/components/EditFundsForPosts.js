import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";
import React from "react";

export default function EditFundsForPosts(props) {
  return (
    <div>
      <CModal
        size="lg"
        closeOnBackdrop={false}
        show={props.editModal}
        onClose={() => props.setEditModal(false)}
        centered
      >
        <CModalHeader closeButton>Edit Funds Received!</CModalHeader>
        <CModalBody>
          <h1> Edit funds by post </h1>
        </CModalBody>
        <CModalFooter>
          <CButton> Close </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
}
