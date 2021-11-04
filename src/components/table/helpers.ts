import { PaginationLocationProps, PaginationProps } from "./models";

export const getPaginationProps = (locationProps: PaginationLocationProps): PaginationProps => {
    const page = parseInt(locationProps.page, 0);
    return {
        page, 
    };
}