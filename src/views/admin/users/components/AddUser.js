import { CModal, CModalBody, CModalHeader } from '@coreui/react'
import React from 'react'
import RegisterForm from 'src/views/pages/register/RegisterForm';

export default function AddUser(props) {

    const closeModal = () => {
        props.loadUsers();
        props.setShowAddUserModal(false);
    }
    return (
        <div>
            <CModal
                show = {props.showAddUserModal}
                onClose = {closeModal}
                closeOnBackdrop = {false}
            >
                <CModalHeader closeButton> Add User </CModalHeader>
                <CModalBody>
                    <RegisterForm 
                        addUserMethod = {"add-user"}
                    />
                </CModalBody>
            </CModal>
        </div>
    )
}
