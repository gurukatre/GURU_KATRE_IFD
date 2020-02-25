import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
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

class FlightDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.open,
            selectedIndex: 1
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ open: nextProps.open });
    }

    handleClose = () => {
        this.props.handleClose();
    };

    handleListItemClick = (event, index) => {
        this.setState({selectedIndex: index});
    };

    render() {
        const {open, flight} = this.props;
        return (
            <div>
                <Dialog fullWidth maxWidth="sm" open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Flight Details</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        <List component="nav" aria-label="secondary mailbox folder">
                            <ListItem button
                            selected={this.state.selectedIndex === 1}
                            onClick={event => this.handleListItemClick(event, 1)}
                            >
                            <ListItemText primary="LANDAD" />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem
                            button
                            selected={this.state.selectedIndex === 2}
                            onClick={event => this.handleListItemClick(event, 2)}
                            >
                                <ListItemText primary="ON SCHEDULE" />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem
                            button
                            selected={this.state.selectedIndex === 3}
                            onClick={event => this.handleListItemClick(event, 3)}
                            >
                                <ListItemText primary="DELAYED" />
                            </ListItem>
                        </List>
                            Time: {flight.time} Location: {flight.location}
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Subscribe
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
export default FlightDetail;