import { CBadge } from '@coreui/react'
import { Alert } from '@material-ui/lab'
import React from 'react'
import { Slide } from 'react-reveal'

export default function DonateSuccess() {
    return (
        <div>
            <Slide right> 
                <Alert color = "success" > Donation Added Succesfully One step to finish! Please add an informer </Alert>
                <CBadge color="success"  > Assign an informer: </CBadge>
                <Alert color="warning" icon = {false}>
                    (Truted person to inform availability of a brain death or death)
                </Alert>
            </Slide>
        </div>
    )
}
