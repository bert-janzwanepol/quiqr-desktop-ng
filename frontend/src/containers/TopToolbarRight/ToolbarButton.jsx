import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme, active }) => ({
  '& .MuiButton-label': {
    flexDirection: 'column',
  },
  textTransform: 'none',
  margin: theme.spacing(0),
  padding: theme.spacing(0),
  ...(active && {
    color: '#757575',
  }),
}));

const ToolbarButton = ({ title, action, icon, active }) => {
  const UseIcon = icon;

  return (
    <Box p={0.5}>
      <StyledButton
        onClick={action}
        active={active}
        className="toolbar-button"
        startIcon={<UseIcon style={{ padding: 0 }} />}
      >
        {title}
      </StyledButton>
    </Box>
  );
};

export default ToolbarButton;

