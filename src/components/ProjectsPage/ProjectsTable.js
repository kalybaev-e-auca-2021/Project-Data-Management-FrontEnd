import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProjectApi } from '../../api/projects';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    Button
} from '@mui/material';
import { ProjectsTableHead } from './ProjectsTableHead';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    return array?.slice().sort(comparator);
}

const ProjectsTable = () => {
    const [list, setList] = useState([]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        const { getProjectsList } = new ProjectApi();
        const res = await getProjectsList();
        setList(res.data.projects);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const visibleRows = useMemo(
        () => stableSort(list, getComparator(order, orderBy)).slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
        ),
        [list, order, orderBy, page, rowsPerPage]
    );

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, list.length - page * rowsPerPage);
    const navigate = useNavigate();
    return (
        <Box sx={{ mt: 3 }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" padding="16px">
                    <h2>Projects</h2>
                    <Button
                        type="primary"
                        variant="contained"
                        onClick={() => navigate(`/project/create`)}
                    >
                        Add Project
                    </Button>
                </Box>
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                        <ProjectsTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={list.length}
                        />
                        <TableBody >
                            {visibleRows.map((row, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.id}
                                        component={Link}
                                        to={`/project/${row.id}`} // Pass the project ID as a URL parameter
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <TableCell component="th" id={labelId} scope="row" padding="normal">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="left">{row.clientCompanyName}</TableCell>
                                        <TableCell align="left">{row.performerCompanyName}</TableCell>
                                        <TableCell align="left">{row.priority}</TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (53) * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={list.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};

export default ProjectsTable;
