import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';

const Alert = props => <MuiAlert elevation={6} variant="filled" {...props} />;

class AddFlight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.open
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.open
        });
    }

    handleClose = () => {
        this.props.handleClose();
    };

    render() {
        return (
            <Dialog fullWidth maxWidth="md" open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Flight Details</DialogTitle>
                <DialogContent>
                    <form className="classnamehere" noValidate autoComplete="off">
                        <div>
                            <TextField required id="standard-required" label="Required" defaultValue="Hello World" />
                            <TextField disabled id="standard-disabled" label="Disabled" defaultValue="Hello World" />
                            <TextField
                                id="standard-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                            />
                            <TextField
                                id="standard-read-only-input"
                                label="Read Only"
                                defaultValue="Hello World"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                id="standard-number"
                                label="Number"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField id="standard-search" label="Search field" type="search" />
                            <TextField
                                id="standard-helperText"
                                label="Helper text"
                                defaultValue="Default Value"
                                helperText="Some important text"
                            />
                              <TextField
                                id="datetime-local"
                                label="Date"
                                type="datetime-local"
                                defaultValue="2017-05-24T10:30"
                                className='classes.textField'
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
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
                    <Button onClick={this.handleUpdate} color="primary">
                        Add Flight
                        </Button>
                </DialogActions>
            </Dialog>

        );
    }
}
export default AddFlight;