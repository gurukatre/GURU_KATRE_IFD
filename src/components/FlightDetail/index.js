import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FlightAPI from '../../services/FlightAPI';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = props => <MuiAlert elevation={6} variant="filled" {...props} />;

class FlightDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.open,
            id: props.flight._id,
            value: props.flight.status,
            flightCode: props.flight.flightCode,
            actionOpen: false,
            severity: '',
            update: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.open,
            value: nextProps.flight.status,
            flightCode: nextProps.flight.flightCode,
            id: nextProps.flight._id,
            update: false
        });
    }

    handleClose = () => {
        this.props.handleClose(this.state.update && this.state.value);
    };

    handleCloseAction = () => {
        this.setState({actionOpen: false});
        this.handleClose();
    };

    handleChange = event => {
        this.setState({value: event.target.value});
    };

    handleUpdate = () => {
        const {flightCode, value} = this.state;
        FlightAPI.putFlight({
            "query" : {
                "flightCode": flightCode
            },
            "data" : {
                "status": value
            }
        }).then(res => {
            if(res.status === 200) {
                this.setState({
                    actionOpen: true,
                    message: 'Updated Successfully',
                    severity: 'success',
                    update: true
                });
            } else {
                this.setState({
                    actionOpen: true,
                    message: 'Something Went wrong',
                    severity: 'error'
                })
            }
        })
    }

    handleDelete = () => {
        FlightAPI.deleteFlight({"_id": this.state.id}).then(res => {
            if(res.status === 200) {
                this.setState({
                    actionOpen: true,
                    message: 'Delete Successfully',
                    severity: 'success'
                });
            } else {
                this.setState({
                    actionOpen: true,
                    message: 'Something Went wrong',
                    severity: 'error'
                })
            }
        })
    }

    render() {
        const {open, flight} = this.props;
        return (
            <div>
                <Dialog fullWidth maxWidth="sm" open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Flight Details</DialogTitle>
                    <DialogContent>
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
                                <Paper className='paddingTen'>{flight.sourcePortName} ({flight.sourcePortCode})</Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper className='paddingTen'>destination Name</Paper>
                            </Grid>
                            <Grid item xs>
                                <Paper className='paddingTen'>{flight.destinationPortName} ({flight.destinationPortCode})</Paper>
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
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleUpdate} color="primary">
                            Update Status
                        </Button>
                        <Button onClick={this.handleDelete} color="secondary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
                <Snackbar open={this.state.actionOpen} className="alert" autoHideDuration={500} onClose={this.handleCloseAction}>
                <Alert onClose={this.handleCloseAction} severity={this.state.severity}>
                    {this.state.message} !
                </Alert>
                </Snackbar>
            </div>
        );
    }
}
export default FlightDetail;