/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    const docsUrl = this.props.config.docsUrl;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    return `${baseUrl}${docsPart}${langPart}${doc}`;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? `${language}/` : '') + doc;
  }

  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <div>
            <h5>Core</h5>
            <a href="https://docs.ark.io/guidebook/developer/setup-dev-environment.html">Getting Started</a>
            <a href="https://docs.ark.io/guidebook/core/development.html">Development</a>
            <a href="https://docs.ark.io/tutorials/node/setup.html">Deployment</a>
          </div>
          <div>
            <h5>Deployer</h5>
            <a href={this.docUrl('prepare/getting-started.html', this.props.language)}>Prepare</a>
            <a href={this.docUrl('customize/getting-started.html', this.props.language)}>Customize</a>
            <a href={this.docUrl('deploy/getting-started.html', this.props.language)}>Deploy</a>
          </div>
          <div>
            <h5>SDK</h5>
            <a href="https://docs.ark.io/sdk/">Getting Started</a>
            <a href="https://docs.ark.io/sdk/examples/sdk-demos.html">Examples</a>
            <a href="https://docs.ark.io/api/public/v2/">API</a>
          </div>
          <div>
            <h5>GitHub</h5>
            <a href="https://github.com/ArkEcosystem/explorer">Explorer</a>
            <a href="https://github.com/ArkEcosystem/desktop-wallet">Desktop Wallet</a>
            <a href="https://github.com/ArkEcosystem/mobile-wallet">Mobile Wallet</a>
          </div>
          <div className="footer-social-wrapper">
            <h5>Social Media</h5>
            <div className="footer-social">
              <div>
                <a href="https://blog.ark.io">Medium</a>
                <a href="https://slack.ark.io">Slack</a>
                <a href="https://discord.ark.io">Discord</a>
              </div>
              <div>
                <a href="https://www.instagram.com/arkecosystem">Instagram</a>
                <a href="https://www.facebook.com/ArkEcosystem">Facebook</a>
                <a href="https://twitter.com/ArkEcosystem">Twitter</a>
              </div>
              <div>
                <a href="https://www.youtube.com/channel/UCpc2k6zOOutGT9y56urDClg">YouTube</a>
                <a href="https://www.reddit.com/r/arkecosystem">Reddit</a>
                <a href="https://steemit.com/@arkecosystem">Steemit</a>
              </div>
            </div>
          </div>
        </section>

        <section className="copyright">
          2017 - {new Date().getFullYear()} ©  <a href="https://ark.io">ARK.io</a> | All rights reserved.
        </section>
      </footer>
    );
  }
}

module.exports = Footer;
