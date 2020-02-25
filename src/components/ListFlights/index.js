import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import FlightDetail from '../FlightDetail'

const formatAddr = value => <div><div className="rightBorder"><div>{value}</div><span>flight name here</span></div></div>;
const formatStatus = value => <div className={value}>{value}</div>;

const columns = [
  { id: 'time', label: 'Name', minWidth: 170 },
  { id: 'location', label: 'location', minWidth: 100, format: formatAddr },
  { id: 'status', label: 'status', minWidth: 100, format: formatStatus },
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

const ListFlights = (flights) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [flight, setFlightDetail] = React.useState({});
  function handleFlightDetail() {
    setFlightDetail(this)
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  flights.flights && Object.keys(flights.flights).map((key) => {
    const flight = flights.flights[key]
    console.log(flight);
  });
  return (
    <Paper className={classes.root}>
      <FlightDetail open={open} handleClose={handleClose} flight={flight} key="detail"/>
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
                        {column.format ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                  <TableCell align="right">
                    <div className="moreDetail">
                      More details
                      <IconButton onClick={handleFlightDetail.bind(row)}>
                        <ArrowForwardIcon style={{ color: 'green' }} />
                      </IconButton></div>
                  </TableCell>
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
