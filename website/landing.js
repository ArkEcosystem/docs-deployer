/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    return (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">
            <div className="inner">
              <h2 className="projectTitle">
                {this.props.siteConfig.title}
                <small>{this.props.siteConfig.tagline}</small>
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl} = siteConfig;

    const Block = props => (
      <Container
        padding={props.padding || ['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const Features = () => (
      <Block layout="threeColumn" padding={['bottom']}>
        {[
           {
            content: 'Follow our Blockchain Preparation Guide to make sure you have all of the relevant information to customize your blockchain. <div class="buttonWrapper"><a class="button" href="/docs/prepare/getting-started">Preparation Guide</a></div>',
            image: `${baseUrl}img/landing/feature-1.svg`,
            imageAlign: 'top',
            title: 'Prepare',
          }, {
            content: 'Follow our Blockchain Customization Guide to get in-depth explanations and recommended settings to use within the ARK Deployer. <div class="buttonWrapper"><a class="button" href="/docs/customize/getting-started">Customization Guide</a></div>',
            image: `${baseUrl}img/landing/feature-2.svg`,
            imageAlign: 'top',
            title: 'Customize',
          }, {
            content: 'Follow our Blockchain Deployment Guide to complete the process and launch and deploy your new blockchain in a matter of minutes! <div class="buttonWrapper"><a class="button" href="/docs/deploy/getting-started">Deployment Guide</a></div>',
            image: `${baseUrl}img/landing/feature-3.svg`,
            imageAlign: 'top',
            title: 'Deploy',
          },
        ]}
      </Block>
    );

    const KickerFirst = () => (
      <Block background="dark">
        {[
          {
            content: 'Before creating your blockchain, there’s a number of factors to consider first. Our Blockchain Preparation Guide is available to assist you with many questions you may have. From designing your economic model, understanding network requirements, preparing your project GitHub account and much more, there’s a lot to think about. Follow our Blockchain Preparation Guide to ensure complete confidence when designing your blockchain. <div class="buttonWrapper"><a class="button" href="/docs/prepare/getting-started">Preparation Guide</a></div>',
            image: `${baseUrl}img/landing/feature-1.svg`,
            imageAlign: 'right',
            title: 'Blockchain Preparation Guide',
          },
        ]}
      </Block>
    );

    const KickerSecond = () => (
      <Block id="try">
        {[
          {
            content: 'The ARK Deployer provides you with a graphical interface that enables you to fully customize your blockchain. Our Blockchain Customization Guide is available to discover the differences between the basic, intermediate and advanced levels whilst understanding how to configure your economic model, fee structure, network peers and much more. Follow our Blockchain Customization Guide to understand all the parameters available when configuring your blockchain. <div class="buttonWrapper"><a class="button" href="/docs/customize/getting-started">Customization Guide</a></div>',
            image: `${baseUrl}img/landing/feature-2.svg`,
            imageAlign: 'left',
            title: 'Blockchain Customization Guide',
          },
        ]}
      </Block>
    );

    const KickerThird = () => (
      <Block background="dark">
        {[
          {
            content: 'Once you’ve configured your blockchain, it’s time to deploy your blockchain and build your network. Our Blockchain Deployment Guide will detail how to transfer your installation scripts to your servers, manage your installation with Core CLI, distribute your tokens and much more. Follow our Blockchain Deployment guide to deploy and build your network with confidence and ease.  <div class="buttonWrapper"><a class="button" href="/docs/deploy/getting-started">Deployment Guide</a></div>',
            image: `${baseUrl}img/landing/feature-3.svg`,
            imageAlign: 'right',
            title: 'Blockchain Deployment Guide',
          },
        ]}
      </Block>
    );


    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer pageContainer">
          <Features />
          <KickerFirst />
          <KickerSecond />
          <KickerThird />
        </div>
      </div>
    );
  }
}

module.exports = Index;
