import { Pagination, PaginationItem } from "@material-ui/lab";
import React from "react"
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { getPaginationProps } from "./helpers";
import { PaginationLocationProps, PaginationProps } from "./models";

type Props = {
    count: number;
}

export const TablePaginationComponent: React.FC<Props> = (props) => {
    const { path } = useRouteMatch();
    const { page } = getPaginationProps(useParams<PaginationLocationProps>());

    const getPathWithParams = (pagination: PaginationProps) => {
        let pathWithParams = path;
        const pageParam = pagination.page === null ? '0' : (pagination.page).toString();
        pathWithParams = pathWithParams.replace(":page", pageParam);

        return pathWithParams;
    }

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
                        to={getPathWithParams({page: item.page-1})}
                        {...item}
                    ></PaginationItem>
                    );
                }}
                
            />
        </span>

    )
}