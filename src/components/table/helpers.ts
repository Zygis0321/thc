import { PaginationLocationProps, PaginationProps } from "./models";

export const getPaginationProps = (locationProps: PaginationLocationProps): PaginationProps => {
    const page = locationProps.page === undefined ? 0 : parseInt(locationProps.page, 0);
    return {
        page, 
    };
}

export const getPathWithParams = (pagination: PaginationProps, path: string) => {
    let pathWithParams = path;
    const pageParam = !pagination.page ? "" : (pagination.page).toString();
    pathWithParams = pathWithParams.replace(":page?", pageParam);
    return pathWithParams;
}
