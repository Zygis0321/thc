import { Pagination, PaginationItem } from "@material-ui/lab";
import React from "react"
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { getPaginationProps, getPathWithParams } from "./helpers";
import { PaginationLocationProps } from "./models";

type Props = {
    count: number;
}

export const TablePaginationComponent: React.FC<Props> = (props) => {
    const { page } = getPaginationProps(useParams<PaginationLocationProps>());
    const { path } = useRouteMatch();
    

    return(
        <span style={{paddingTop: 10, paddingBottom: 10, display: 'flex', justifyContent: 'right'}}>
            <Pagination
                count={props.count}
                page={page+1}
                color="secondary"
                style={{whiteSpace: 'nowrap'}}
                renderItem={(item) => {       
                    return (
                    <PaginationItem
                        component={Link}
                        to={getPathWithParams({page: item.page-1}, path)}
                        {...item}
                    ></PaginationItem>
                    );
                }}
                
            />
        </span>

    )
}