import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import FlightAPI from '../../services/FlightAPI';

const Alert = props => <MuiAlert elevation={6} variant="filled" {...props} />;

class AddFlight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.open,
            flightCode: '',
            flightProvider: '',
            sourcePortName: '',
            sourcePortCode: '',
            destinationPortName:'',
            destinationPortCode:'',
            scheduledArrival: new Date(),
            scheduledDeparture: new Date(),

        }
    }

    handleAddFlight = () => {
        const { 
            flightCode,
            flightProvider,
            sourcePortName,
            sourcePortCode,
            destinationPortName,
            destinationPortCode,
            scheduledArrival
        } = this.state;
        FlightAPI.postFlight({
                "flightCode": flightCode,
                "flightProvider": flightProvider,
                "sourcePortName": sourcePortName,
                "sourcePortCode": sourcePortCode,
                "destinationPortName": destinationPortName,
                "destinationPortCode": destinationPortCode,
                "scheduledArrival": scheduledArrival,
                "status": "ON SCHEDULE"
        }).then(res => {
            if(res.status === 200) {
                this.setState({
                    actionOpen: true,
                    message: 'Flight Added Successfully',
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
        });
    }

    handleCloseAction = () => {
        this.handleClose();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.open
        });
    }

    handleClose = () => {
        this.props.handleClose();
    };

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value });
    }

    render() {
        const { 
            flightCode,
            flightProvider,
            sourcePortName,
            sourcePortCode,
            destinationPortName,
            destinationPortCode,
            scheduledArrival
        } = this.state;
        return (
            <Dialog fullWidth maxWidth="md" open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Flight Details</DialogTitle>
                <DialogContent>
                    <form className="classnamehere" noValidate autoComplete="off">
                        <div>
                            <TextField
                                id="standard-required"
                                label="Flight Code"
                                type="number"
                                name="flightCode"
                                value={flightCode}
                                onChange={this.handleChange}
                                />
                            <TextField
                                id="standard-password-input"
                                label="Flight Provider"
                                name="flightProvider"
                                value={flightProvider}
                                onChange={this.handleChange}
                             />
                            <TextField
                                id="standard-read-only-input"
                                label="Source Port Name"
                                name="sourcePortName"
                                value={sourcePortName}
                                onChange={this.handleChange}
                             />
                            <TextField
                                id="standard-number"
                                label="Source Port Code"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                name="sourcePortCode"
                                value={sourcePortCode}
                                onChange={this.handleChange}
                            />
                            <TextField
                                id="standard-helperText"
                                label="Destination Port Name"
                                name="destinationPortName"
                                value={destinationPortName}
                                onChange={this.handleChange}
                             />
                            <TextField
                                id="destinationPortCode"
                                label="Destination Port Code"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                name="destinationPortCode"
                                value={destinationPortCode}
                                onChange={this.handleChange}
                                />
                              <TextField
                                id="datetime-local"
                                label="Scheduled Arrival"
                                type="datetime-local"
                                defaultValue={scheduledArrival}
                                className='classes.textField'
                                InputLabelProps={{
                                shrink: true,
                                }}
                                name="scheduledArrival"
                                onChange={this.handleChange}
                            />
                            {/* <TextField
                                id="datetime-local"
                                label="Scheduled Departure"
                                type="datetime-local"
                                defaultValue={scheduledDeparture}
                                value={scheduledDeparture}
                                className='classes.textField'
                                InputLabelProps={{
                                shrink: true,
                            }}
                            name="scheduledDeparture"
                            onChange={this.handleChange}
                            /> */}
                        </div>
                        <Snackbar open={this.state.actionOpen} className="alert" autoHideDuration={500} onClose={this.handleCloseAction}>
                            <Alert onClose={this.handleCloseAction} severity={this.state.severity}>
                                {this.state.message} !
                        </Alert>
                        </Snackbar>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                        </Button>
                    <Button onClick={this.handleAddFlight} color="primary">
                        Add Flight
                        </Button>
                </DialogActions>
            </Dialog>

        );
    }
}
export default AddFlight;