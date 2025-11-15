import * as React          from 'react';
import withStyles from '@mui/styles/withStyles';
import Box                 from '@mui/material/Box';
import Paper               from '@mui/material/Paper';
import Typography          from '@mui/material/Typography';
import GitHubIcon          from '@mui/icons-material/GitHub';

const useStyles = theme => ({
});

class CardNew extends React.Component{

  render(){
    return (
      <Paper
        onClick={()=>{
          this.props.handleClick();
        }}
        className={this.props.classes.paper}
        elevation={5}
      >
        <Box display="flex" alignItems="center"  justifyContent="center" height={63}>
          <GitHubIcon fontSize="large" />
        </Box>
        <Box display="flex" alignItems="center"  justifyContent="center" >
          <Typography variant="h5">Github Target</Typography>
        </Box>
        <Box display="flex" textAlign="center">
          <Typography variant="">Sync with github using embedded git binary</Typography>
        </Box>


      </Paper>
    )
  }

}

export default withStyles(useStyles)(CardNew);


