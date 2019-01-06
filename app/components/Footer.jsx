import React, { Component } from 'react';
import styles from './styles/Footer.css';
import githubMark from '../../resources/icons/GitHubMark.png';

type Props = {
  version: string,
  logo: string
};

class Footer extends Component<Props> {
  constructor(props) {
    super(props);

    const { logo, version } = this.props;

    this.state = {
      version: `v${version}`,
      logo
    };
  }

  render() {
    const { footer, imgStyle, textStyle, aStyle } = styles;
    const { logo, version } = this.state;
    return (
      <div className={footer}>
        <a
          className={aStyle}
          href="https://github.com/GPUSPH/gpusph"
          onClick={event => {
            event.preventDefault();
            window.open(
              'https://github.com/GPUSPH/gpusph',
              '_blank',
              'width=1100,height=600,resizable,scrollbars'
            );
          }}
        >
          <img className={imgStyle} alt="logo" src={logo} />
        </a>
        <div className={textStyle}>
          {version}
          <a
            style={{ marginLeft: '10px' }}
            className={aStyle}
            href="https://github.com/rtorrisi/GPUSPH-GUI"
            onClick={event => {
              event.preventDefault();
              window.open(
                'https://github.com/rtorrisi/GPUSPH-GUI',
                '_blank',
                'width=1100,height=600,resizable,scrollbars'
              );
            }}
          >
            <img className={imgStyle} alt="github" src={githubMark} />
          </a>
        </div>
      </div>
    );
  }
}

export default Footer;
