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
import FlightDetail from '../FlightDetail';

const formatAddr = row => <div><div className="rightBorder"><div className="bold">{row['destinationPortName']}</div><span>{row['flightProvider']}</span></div></div>;
const formatStatus = row => <div className={row['status']}>{row['status']}</div>;
const formatArrival = row => {
  let date = new Date(row['scheduledArrival']);
  let previousTime = '';
  if(row['status'] == 'DELAYED') {
    let newDate = new Date(date.getTime() + 15*60000);
    previousTime = (newDate.getHours()<10?'0':'') + newDate.getHours() + ':' + (newDate.getMinutes()<10?'0':'') + newDate.getMinutes();
  }

  if(previousTime) {
    return <div><s className="SmallFont">{(date.getHours()<10?'0':'') + date.getHours() + ':' + (date.getMinutes()<10?'0':'') + date.getMinutes()}</s>  {previousTime}</div>;
  } else {
    return (date.getHours()<10?'0':'') + date.getHours() + ':' + (date.getMinutes()<10?'0':'') + date.getMinutes();
  }
  
}
const columns = [
  { id: 'scheduledArrival', label: 'Name', minWidth: 170, format: formatArrival },
  { id: 'destinationPortName', label: 'location', minWidth: 100, format: formatAddr },
  { id: 'status', label: 'status', minWidth: 100, format: formatStatus }
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

const ListFlights = (props) => {

  let flights = props.flights && {...props.flights};
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [key, setKey] = React.useState();
  const [flight, setFlightDetail] = React.useState({});


  function handleFlightDetail(key) {
    setKey(key);
    setFlightDetail(this)
    setOpen(true);
  }

  function handleClose(value) {
    if(value) {
      flights[key].status = value;
    }
    else {
      props.fetchFlights();
    }
    setOpen(false);
  }

  return (
    <Paper className={classes.root}>
      <FlightDetail open={open} handleClose={handleClose} flight={flight} key="detail"/>
      <TableContainer className={classes.container}>
        <Table aria-label="sticky table">
          <TableBody>
            {flights && Object.keys(flights).map((key) => {
              const row = flights[key]
              return (
                <TableRow hover tabIndex={-1} key={row._id}>
                  {columns.map(column => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format ? column.format(row) : value}
                      </TableCell>
                    );
                  })}
                  <TableCell align="left">Terminal T1</TableCell>
                  <TableCell align="right">
                    <div className="moreDetail">
                      More details
                      <IconButton onClick={handleFlightDetail.bind(row, key)}>
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
