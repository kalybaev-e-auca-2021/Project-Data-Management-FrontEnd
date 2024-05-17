import React from 'react';
import { TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';

const headCells = [
    { id: 'name', numeric: false, disablePadding: false, label: 'Project Name' },
    { id: 'clientCompanyName', numeric: false, disablePadding: false, label: 'Client Company Name' },
    { id: 'performerCompanyName', numeric: false, disablePadding: false, label: 'Performer Company Name' },
    { id: 'priority', numeric: false, disablePadding: false, label: 'Priority' },
];

export const ProjectsTableHead = (props) => {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};
