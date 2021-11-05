import { Link as MaterialLink, TableCell } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import Flag from "react-world-flags";
import { CellField, CellValues } from "../../common/models";

type Props = {
    field: CellField;
    values: CellValues;
    class?: string;
}

export const TableCellComponent: React.FC<Props> = (props) => {
    switch (props.field.type) {
        case 'flag':
            return (
                <TableCell className={props.class} style={{padding:10, height: '40px'}}>
                    <Flag
                        style = {{width:'60px', display:"block", marginTop:"auto", marginBottom:"auto", borderRadius:"4px", boxShadow: '0 0px 2px 0px rgb(150, 150, 150)'}}
                        alt = {props.values[props.field.name]}
                        title = {props.values[props.field.name]}
                        code={props.values[props.field.alpha2Code].toLowerCase()}
                    />
                </TableCell>
            );
        case 'link':
            const linkTo = props.values[props.field.link]
            return (
                <TableCell className={props.class}>
                    <MaterialLink 
                        component = {(item) => <Link to={linkTo} {...item}/>}
                        color="inherit"
                        variant="body2"
                    >
                        {props.values[props.field.name]}
                    </MaterialLink>
                </TableCell>
            );
        case 'text':
            return (
                <TableCell className={props.class} style = {{fontWeight: props.field.isBold ? 600 : undefined}}>
                    {props.values[props.field.name]}
                </TableCell>
            );
    }
}