import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ScatterPlot from '@material-ui/icons/ScatterPlot';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Settings from '@material-ui/icons/Settings';

import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = theme => ({
  drawer: {
    width: 170,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    zIndex: '10'
  },
  drawerOpen: {
    width: 170,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: 'hidden',
    backgroundColor: '#272a31',
    borderRight: '1px solid #111',
    position: 'relative'
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    backgroundColor: '#272a31',
    borderRight: '1px solid #111',
    position: 'relative'
  },
  chevron: {
    minHeight: '50px',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0px 4px'
  },
  whiteColor: {
    color: 'white'
  }
});

type Props = {
  classes: {},
  open: boolean,
  toggleAction: () => void
};

class DrawerBar extends Component<Props> {
  toggleDrawer = () => {};

  render() {
    const { classes, open, toggleAction } = this.props;
    const { drawer, drawerOpen, drawerClose, chevron, whiteColor } = classes;

    return (
      <Drawer
        variant="permanent"
        className={classNames(drawer, {
          [drawerOpen]: open,
          [drawerClose]: !open
        })}
        classes={{
          paper: classNames({
            [drawerOpen]: open,
            [drawerClose]: !open
          })
        }}
        open={open}
      >
        <div className={chevron}>
          <IconButton onClick={toggleAction}>
            {open ? (
              <ChevronLeftIcon classes={{ root: whiteColor }} />
            ) : (
              <ChevronRightIcon classes={{ root: whiteColor }} />
            )}
          </IconButton>
        </div>
        <Divider style={{ backgroundColor: 'rgba(255,255,255,0.12)' }} />
        <List>
          <ListItem button key="Simulate">
            <ListItemIcon>
              <ScatterPlot classes={{ root: whiteColor }} />
            </ListItemIcon>
            <ListItemText
              primary="Simulate"
              style={{ padding: '0px 5px' }}
              classes={{ primary: whiteColor }}
            />
          </ListItem>
        </List>
        <Divider style={{ backgroundColor: 'rgba(255,255,255,0.12)' }} />
        <List>
          <ListItem button key="Settings">
            <ListItemIcon>
              <Settings classes={{ root: whiteColor }} />
            </ListItemIcon>
            <ListItemText
              primary="Settings"
              style={{ padding: '0px 5px' }}
              classes={{ primary: whiteColor }}
            />
          </ListItem>
        </List>
      </Drawer>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DrawerBar);
