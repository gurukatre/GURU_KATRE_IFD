import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


class FlightDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.open,
            value: props.flight.status
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ open: nextProps.open, value: nextProps.flight.status });
    }

    handleClose = () => {
        this.props.handleClose();
    };

    handleChange = event => {
        this.setState({value: event.target.value});
    };

    handleUpdate = id => {
        console.log('update');
    }

    render() {
        const {open, flight} = this.props;
        return (
            <div>
                <Dialog fullWidth maxWidth="sm" open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Flight Details</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        _id: "035c3370-5791-11ea-a11d-a98752bdf106"
                        <Grid container>
                            <Grid item xs={6}>
                                <Paper className='paddingTen'>flight Code</Paper>
                            </Grid>
                            <Grid item xs>
                                <Paper className='paddingTen'>{flight.flightCode}</Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper className='paddingTen'>scheduled Arrival</Paper>
                            </Grid>
                            <Grid item xs>
                                <Paper className='paddingTen'>{flight.scheduledArrival}</Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper className='paddingTen'>flight Provider</Paper>
                            </Grid>
                            <Grid item xs>
                                <Paper className='paddingTen'>{flight.flightProvider}</Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper className='paddingTen'>source Name</Paper>
                            </Grid>
                            <Grid item xs>
                                <Paper className='paddingTen'>{flight.sourcePortName}</Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper className='paddingTen'>destination Name</Paper>
                            </Grid>
                            <Grid item xs>
                                <Paper className='paddingTen'>{flight.destinationPortName}</Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper className='paddingTen'>source Code</Paper>
                            </Grid>
                            <Grid item xs>
                                <Paper className='paddingTen'>{flight.sourcePortCode}</Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper className='paddingTen'>destination Code</Paper>
                            </Grid>
                            <Grid item xs>
                                <Paper className='paddingTen'>{flight.destinationPortCode}</Paper>
                            </Grid>
                        </Grid>
                        
                        <FormControl component="fieldset" >
                            <FormLabel className="formLabel">Status :</FormLabel>
                            <RadioGroup aria-label="Status" name="Status" value={this.state.value} onChange={this.handleChange}>
                            <FormControlLabel
                                value="LANDED"
                                control={<Radio color="primary" />}
                                label="LANDED"
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                value="ON SCHEDULE"
                                control={<Radio color="primary" />}
                                label="ON SCHEDULE"
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                value="DELAYED"
                                control={<Radio color="primary" />}
                                label="DELAYED"
                                labelPlacement="start"
                            />
                            </RadioGroup>
                        </FormControl>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleUpdate} color="primary">
                            Update Status
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
export default FlightDetail;