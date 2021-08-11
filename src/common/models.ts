type FieldType = 
    | 'text'
    | 'flag'
    | 'link'

type Field = {
    type: FieldType;
    name: string;
    label: string;
    hideMobile?: boolean;
    hideTablet?: boolean;
}

type TextField = Field & {type: 'text'; isBold?: boolean; };
type FlagField = Field & {type: 'flag'; };
type LinkField = Field & {type: 'link'; };

export type CellField = 
    | TextField
    | FlagField
    | LinkField;

export type CellValues = {
    [name: string]: any;
}
