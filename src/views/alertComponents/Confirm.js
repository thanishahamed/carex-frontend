import React from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader } from '@coreui/react'

export default function Confirm(props) {
    return (
        <CModal
            show={props.show}
            onClose={props.setShow}
            centered = {true}
        >
            <CModalHeader closeButton>{props.comfirmHeader}</CModalHeader>
            <CModalBody>
                {props.confirmMessage}
            </CModalBody>
            <CModalFooter>
            <CButton color="primary" onClick = {props.confirmedFunction}>Do Something</CButton>{' '}
            <CButton
                color="secondary"
                onClick={props.setShow}
            >Cancel</CButton>
            </CModalFooter>
      </CModal>
    )
}
