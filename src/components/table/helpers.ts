import { PaginationLocationProps, PaginationProps } from "./models";

export const getPaginationProps = (locationProps: PaginationLocationProps): PaginationProps => {
    const page = parseInt(locationProps.page, 0);
    const rowsPerPage = parseInt(locationProps.rowsPerPage, 10);
    return {
        page, 
        rowsPerPage,
    };
}