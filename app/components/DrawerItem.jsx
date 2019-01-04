import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  color: {
    color: 'white'
  }
});

type Props = {
  classes: {},
  label: string,
  icon: React.Node,
  onClick: string => void
};

class DrawerBar extends Component<Props> {
  props: Props;

  render() {
    const { label, icon, onClick, classes } = this.props;
    const { color } = classes;
    const Icon = icon;

    return (
      <ListItem button key={label} onClick={onClick}>
        <ListItemIcon>
          <Icon classes={{ root: color }} />
        </ListItemIcon>
        <ListItemText
          primary={label}
          style={{ padding: '0px 5px' }}
          classes={{ primary: color }}
        />
      </ListItem>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DrawerBar);
