import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import withStyles, { WithStyles } from '@mui/styles/withStyles';

const useStyles = (theme: any) => ({
  iconButton: {
    margin: theme.spacing(0),
    padding: theme.spacing(0),
  },
});

interface TopToolbarRightProps extends WithStyles<typeof useStyles> {
  itemsLeft: React.ReactElement[];
  itemsCenter: React.ReactElement[];
  itemsRight: React.ReactElement[];
}

class TopToolbarRight extends React.Component<TopToolbarRightProps> {
  render() {
    return (
      <Grid container spacing={3}>
        <Grid item xs>
          <Box display="flex" flexDirection="row" border={0} alignItems="center">
            {this.props.itemsLeft.map((item, index) => {
              return item;
            })}
          </Box>
        </Grid>
        <Grid item xs>
          <Box display="flex" justifyContent="center" flexDirection="row" border={0} alignItems="center">
            {this.props.itemsCenter.map((item, index) => {
              return item;
            })}
          </Box>
        </Grid>
        <Grid item xs>
          <Box display="flex" justifyContent="flex-end" flexDirection="row" width={1} border={0} alignItems="center">
            {this.props.itemsRight.map((item, index) => {
              return item;
            })}
          </Box>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(TopToolbarRight);
