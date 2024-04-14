import { useState } from 'react'
import { useSelector } from 'react-redux'


import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
function createData(sumProduct, qty, name, imgUrl) {
    sumProduct = parseFloat(Number(sumProduct).toFixed(1))
    return {
        sumProduct, qty, name, imgUrl
    };
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));


export default function BasicTable() {
    const { cart, cartSum } = useSelector(store => store.orders)
    const rows = cart.map(item => { return createData(item.sumProduct, item.qty, item.name, item.imgUrl) })

    return (<>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        {/* <TableCell>Dessert (100g serving)</TableCell> */}
                        <StyledTableCell align="center">לתשלום</StyledTableCell>
                        <StyledTableCell align="center">כמות</StyledTableCell>
                        <StyledTableCell align="center">שם מוצר</StyledTableCell>
                        <StyledTableCell align="center">תמונה</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}

                        >
                            {/* <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell> */}
                            <TableCell align="center">{row.sumProduct}</TableCell>
                            <TableCell align="center">{row.qty}</TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center" 
                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            > {<Avatar alt="Remy Sharp" src={row.imgUrl} />}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>
    );
}