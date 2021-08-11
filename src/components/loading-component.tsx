import CircularProgress from "@material-ui/core/CircularProgress"
import React, { PropsWithChildren } from "react"

type Props = {
    isLoading: boolean;
}

export const LoadingComponent: React.FC<Props> = (props) => {
    if (props.isLoading){
        return(
            <div style={{
                height:'calc(100vh - 100px)',
                display:'flex', 
                justifyContent:"center", 
                alignItems:'center'}}
            >
                <CircularProgress style = {{alignSelf:'center'}}/>
            </div>
        )
    }
    return <>{props.children}</>;
}