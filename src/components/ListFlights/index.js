import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'time', label: 'Name', minWidth: 170 },
  { id: 'location', label: 'location', minWidth: 100 },
  { id: 'status', label: 'status', minWidth: 100 },
  { id: 'terminal', label: 'terminal', minWidth: 170 }
];

const rows = [
  { 'time': '17:05', 'location': 'Frankfurt FRA', 'status': 'LANDED', 'terminal': 'Terminal T1' },
  { 'time': '18:06', 'location': 'Munich', 'status': 'ON SCHEDULE', 'terminal': 'Terminal T1' },
  { 'time': '19:10', 'location': 'Helsinki', 'status': 'ON SCHEDULE', 'terminal': 'Terminal T1' },
  { 'time': '20:25', 'location': 'Prague', 'status': 'DELAYED', 'terminal': 'Terminal T1' }
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: '100%'
  },
  row: {

  }
});

const ListFlights = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table aria-label="sticky table">
          <TableBody>
            {rows.map(row => {
              return (
                <TableRow hover tabIndex={-1} key={row.code}>
                  {columns.map(column => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default ListFlights;
