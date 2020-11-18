import React from "react";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export function ErrorMessage(props: {show: boolean}){

    return(
        <Snackbar open={props.show} >
            <Alert severity="error">
                Failed to load data
            </Alert>
        </Snackbar>

    )
}