/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

const siteConfig = {
  title: "ARK Deployer Hub",
  tagline: "The ARK Deployer is an intuitive graphical interface empowering developers, startups and enterprise the ability to design, customize and build a blockchain to the specification of their use case.",
  url: "https://deployer.ark.dev",
  baseUrl: "/",
  docsUrl: "",
  defaultVersionShown: "1.0.0",
  organizationName: "ArkEcosystem",
  projectName: "deployer-hub",
  repoUrl: "https://github.com/ArkEcosystem/deployer",
  headerLinks: [{
      href: "https://deployer.ark.io/",
      label: "Launch Deployer"
    }, {
      href: "https://github.com/ArkEcosystem/deployer",
      label: "GitHub"
    },
    {
      search: true
    }
  ],
  headerIcon: "img/logo.svg",
  favicon: "img/ark-logo.png",
  colors: {
    primaryColor: "#c9292c",
    secondaryColor: "#c9292c"
  },
  highlight: {
    theme: "atom-one-dark"
  },
  scripts: [
    "https://buttons.github.io/buttons.js",
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js",
      async: true
    },
    "/js/code-block-buttons.js"
  ],
  stylesheets: [
    "https://use.typekit.net/hqe2ccc.css"
  ],
  algolia: {
    apiKey: 'eb40f42a4745a51552b9b12d0869110e',
    indexName: 'ark_deployer_hub'
  },
  onPageNav: "separate",
  docsSideNavCollapsible: true,
  cleanUrl: true,
  scrollToTop: true,
  gaTrackingId: "UA-107925390-1"
};

module.exports = siteConfig;
