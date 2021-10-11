import { Backdrop } from '@material-ui/core'
import React from 'react'

export default function Loader(props) {
    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={props.open}
            >
                <div class="lds-ripple"><div></div><div></div></div>
            </Backdrop>
        </div>
    )
}
