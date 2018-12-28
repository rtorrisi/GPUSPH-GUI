import React, { Component } from 'react';
import styles from './styles/Header.css';

type Props = {
  leftTitle: string,
  rightTitle: string
};

class Header extends Component<Props> {
  props: Props;

  render() {
    const { leftTitle, rightTitle } = this.props;
    return (
      <div className={styles.header}>
        <div>{leftTitle}</div>
        <div>{rightTitle}</div>
      </div>
    );
  }
}

export default Header;
