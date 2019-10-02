/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  render() {
    return (
      <footer className="nav-footer" id="footer">
        <div className="wrapper">
          <div className="copy">{this.props.config.copyright}</div>
          <div>
            <a href="https://github.com/ArkEcosystem/core" target="_blank">GitHub</a>
            <a href="https://ark.io/privacy-policy" target="_blank">Privacy Policy</a>
          </div>
        </div>
      </footer>
    );
  }
}

module.exports = Footer;
