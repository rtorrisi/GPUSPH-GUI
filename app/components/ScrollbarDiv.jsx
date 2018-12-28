import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

const renderView = () => <div style={{ paddingRight: '15px' }} />;

const renderThumb = () => (
  <div style={{ backgroundColor: '#313641', borderRadius: 10 }} />
);

export default class ScrollbarDiv extends Component {
  render() {
    return (
      <Scrollbars
        renderView={renderView}
        renderTrackHorizontal={() => <div />}
        renderThumbHorizontal={renderThumb}
        renderThumbVertical={renderThumb}
        {...this.props}
      />
    );
  }
}
