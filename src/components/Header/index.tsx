import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles, Container } from '@material-ui/core';
import { Face } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  flex: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    marginRight: '0.3em'
  },
  responsiveText: {
    fontSize: '14px'
  }
}));

export default function Header() {
  const classes = useStyles({});

  return (
    <AppBar position="sticky">
      <Container>
        <Toolbar>
          <Typography variant="h6" className={classes.title + ' ' + classes.flex + ' ' + classes.responsiveText}>
            <Face className={classes.icon} /> Visual Sort
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
