import { PaginationLocationProps, PaginationProps } from "./models";

export const getPaginationProps = (locationProps: PaginationLocationProps): PaginationProps => {
    const page = parseInt(locationProps.page, 0);
    return {
        page, 
    };
}

export const getPathWithParams = (pagination: PaginationProps, path: string) => {
    let pathWithParams = path;
    const pageParam = pagination.page === null ? '0' : (pagination.page).toString();
    pathWithParams = pathWithParams.replace(":page", pageParam);

    return pathWithParams;
}
