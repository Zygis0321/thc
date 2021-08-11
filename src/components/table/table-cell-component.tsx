import { Link, TableCell } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import Flag from "react-world-flags";
import { CellField } from "../../common/models";
import { getCountry } from "../../services/country-service";

type Props = {
    field: CellField;
    value: any;
    class?: string;
}

export const TableCellComponent: React.FC<Props> = (props) => {
    const history = useHistory();
    switch (props.field.type) {
        case 'flag':
            return (
                <TableCell className={props.class} style={{padding:10, height: '40px'}}>
                    <Flag
                        style = {{width:'60px', display:"block", marginTop:"auto", marginBottom:"auto", borderRadius:"4px", boxShadow: '0 0px 2px 0px rgb(150, 150, 150)'}}
                        alt = {getCountry(props.value).name}
                        title = {getCountry(props.value).name}
                        code={getCountry(props.value).alpha2code.toLowerCase()}
                    />
                </TableCell>
            );
        case 'link':
            return (
                <TableCell className={props.class}>
                    <Link 
                        component="button"
                        onClick={()=>history.push(props.value.link)} 
                        color="inherit"
                        variant="body2"
                    >
                        {props.value.value}
                    </Link>
                </TableCell>
            );
        case 'text':
            return (
                <TableCell className={props.class} style = {{fontWeight: props.field.isBold ? 600 : undefined}}>
                    {props.value}
                </TableCell>
            );
    }
}