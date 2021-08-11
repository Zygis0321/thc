import { TablePagination } from "@material-ui/core"
import React, { useEffect } from "react"
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import { getPaginationProps } from "./helpers";
import { PaginationLocationProps, PaginationProps } from "./models";

type Props = {
    count: number;
    rowsPerPageOptions: number[];
}

export const TablePaginationComponent: React.FC<Props> = (props) => {

    const history = useHistory();
    const { path } = useRouteMatch();
    const { page, rowsPerPage } = getPaginationProps(useParams<PaginationLocationProps>());
    
    useEffect(() => {
        if(page*rowsPerPage>props.count){
            handleChangePage(null, 0);
        }
    }, [props.count, page, rowsPerPage])

    const getPathWithParams = (pagination: PaginationProps) => {
        let pathWithParams = path;
        pathWithParams = pathWithParams.replace(":page", pagination.page.toString());
        pathWithParams = pathWithParams.replace(":rowsPerPage", pagination.rowsPerPage.toString());

        return pathWithParams;
    }

    const handleChangePage = (event: any, newPage: number) => {
        history.push(getPathWithParams({page: newPage, rowsPerPage}));
    };
    
    const handleChangeRowsPerPage = (event: any) => {
        history.push(getPathWithParams({page, rowsPerPage: event.target.value}));
    };

    return(
        <TablePagination
            component="div"
            rowsPerPageOptions={props.rowsPerPageOptions}
            colSpan={3}
            count={props.count}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />

    )
}