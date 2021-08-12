import { TableBody, TableCell, TableFooter, TablePagination, TableSortLabel } from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { CellField, CellValues } from "../../common/models";
import { PaginationProps } from "./models";
import { TableCellComponent } from "./table-cell-component";

type Props = {
    fields: CellField[];
    values: CellValues[];
    pagination?: PaginationProps;
    includeSerialNumber?: boolean;
}

export const TableComponent: React.FC<Props> = (props) => {
    const isMobile = useMediaQuery({maxWidth:'599px'})
    const isTablet = useMediaQuery({maxWidth:'959px'})
    
    const [orderBy, setOrderBy] = useState(0);
    const [sortDir, setSortDir] = useState<"asc"|"desc">('asc')

    const handleSort = (a: CellValues, b: CellValues): number => {
        const fieldName = props.fields[orderBy].name;
        const dir = sortDir === 'asc' ? 1 : -1
        const isLink = props.fields[orderBy].type === 'link';
        const valueA = isLink ? a[fieldName].value : a[fieldName];
        const valueB = isLink ? b[fieldName].value : b[fieldName];

        if(valueA === valueB){
            if(a[props.fields[0].name] < b[props.fields[0].name])
                return -1;
            return 1;
        }
        if (valueA < valueB)
            return dir * -1;
        return dir;
    }

    const page: number = props.pagination ? props.pagination.page : 0;
    const rowsPerPage: number = props.pagination ? props.pagination.rowsPerPage : props.values.length;

    return (
        <>
            <TableHead>
                <TableRow>
                    {
                        props.includeSerialNumber && 
                        <TableCell className = "Table-cell" style={{fontWeight: 600}} >#</TableCell>
                    }
                    {
                        props.fields.map((field, index) => 
                            !(isMobile && field.hideMobile) && 
                            !(isTablet && field.hideTablet) && 
                            <TableCell 
                                className="Table-cell"
                                style={{fontWeight: 600}} 
                                sortDirection={orderBy===index?sortDir:undefined}
                            >
                                <TableSortLabel
                                    active={orderBy===index}
                                    direction={orderBy===index?sortDir:'asc'}
                                    onClick={() => {
                                        setSortDir((prev) => {
                                            if(index!==orderBy)return 'asc';
                                            if(prev === 'asc')return 'desc';
                                            return 'asc'
                                        });
                                        setOrderBy(index);
                                    }}
                                >
                                    {field.label}

                                </TableSortLabel>
                            </TableCell>
                        )
                    }
                </TableRow>
            </TableHead>
            <TableBody>
                {props.values.sort(handleSort).slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((value, index) => 
                    <TableRow 
                        style={{backgroundColor: value.isMain ? '#fbecf1': undefined}}
                    >
                        {
                            props.includeSerialNumber && 
                            <TableCell className = "Table-cell">{page * rowsPerPage + index + 1}</TableCell>
                        }
                        {
                            props.fields.map((field, index) => 
                                !(isMobile && field.hideMobile) && 
                                !(isTablet && field.hideTablet) && 
                                <TableCellComponent
                                    field = {field}
                                    value = {value[field.name]}
                                    class = {index+1 < props.fields.length ? "Table-cell": undefined}
                                />
                            )
                        }
                    </TableRow>
                )}
            </TableBody>
        </>
    );
}