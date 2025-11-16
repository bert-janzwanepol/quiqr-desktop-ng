import * as React           from 'react';
import withStyles from '@mui/styles/withStyles';
import Button               from '@mui/material/Button';
import Box                  from '@mui/material/Box';
import MuiDialogTitle       from '@mui/material/DialogTitle';
import Typography           from '@mui/material/Typography';
import Dialog               from '@mui/material/Dialog';
import DialogActions        from '@mui/material/DialogActions';
import DialogContent        from '@mui/material/DialogContent';
import DialogContentText    from '@mui/material/DialogContentText';
import LinearProgress       from '@mui/material/LinearProgress';

const useStyles = theme => ({
  root: {
    margin: 0,
  },
  serverFormLogo: {
    position: 'absolute' as const,
    right: theme.spacing(3),
    top: theme.spacing(3),
  },
});

interface SyncBusyDialogProps {
  open?: boolean;
  icon?: React.ReactNode;
  serverTitle?: string;
  onClose: () => void;
  classes?: any; // Added by withStyles HOC
}

interface SyncBusyDialogState {
  infoTxt: string;
}

class SyncBusyDialog extends React.Component<SyncBusyDialogProps, SyncBusyDialogState>{

  constructor(props){
    super(props);

    this.state = {
      infoTxt: "."
    }
  }

  componentDidMount(){
    //PORTQUIQR
    /*
    window.require('electron').ipcRenderer.on('updateProgress',(event, infoTxt, percent)=>{
      this.setState({infoTxt: infoTxt});
    });
    */
  }

  render(){
    let { open, classes } = this.props;

    return (
      <Dialog
        open={open||false}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth="sm" >

        <MuiDialogTitle className={classes.root}>
          <Box className={classes.serverFormLogo}>
          {this.props.icon}
          </Box>

          <Typography variant="h6">{this.props.serverTitle || ""}</Typography>
        </MuiDialogTitle>

        <DialogContent>
          <LinearProgress />
          <br/>
          <DialogContentText id="alert-dialog-description">
            {this.state.infoTxt}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={this.props.onClose}>
            {"cancel"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(useStyles)(SyncBusyDialog);
