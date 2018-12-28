import React, { Component } from 'react';
import styles from './styles/Footer.css';

type Props = {
  version: string,
  logo: string
};

class Footer extends Component<Props> {
  state = () => {
    const { logo, version } = this.props;
    return {
      version: `v${version}`,
      logo
    };
  };

  render() {
    const { footer, logoStyle, textStyle } = styles;
    const { logo, version } = this.state;
    return (
      <div className={footer}>
        <img className={logoStyle} alt="logo" src={logo} />
        <div className={textStyle}>{version}</div>
      </div>
    );
  }
}

export default Footer;
