<h1 align="center"><img src="https://raw.githubusercontent.com/jeeanribeiro/simple-remote-pair/master/logo.png"></h1>
<p align="center">
  <img src="https://img.shields.io/npm/v/simple-remote-pair.svg?orange=blue" />
  <a href="https://github.com/jean-m-ribeiro/simple-pair/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/jean-m-ribeiro/simple-pair/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/jean-m-ribeiro/simple-remote-pair" />
  </a>
  <a href="https://twitter.com/jeeanribeiro" target="_blank">
    <img alt="Twitter: jeeanribeiro" src="https://img.shields.io/twitter/follow/jeeanribeiro.svg?style=social" />
  </a>
</p>

> Simple multiplayer remote pairing web app built with [RobotJS](https://github.com/octalmage/robotjs) for controlling mouse/keyboard and [Socket.io](https://github.com/socketio/socket.io) for sharing mouse/keyboard events and signaling to start a [simple-peer](https://github.com/feross/simple-peer) connection via WebRTC to stream the host screen (needs VPN or LAN to work).

### 🏠 [Homepage](https://jeeanribeiro.github.io/simple-remote-pair/)

## Usage

```sh
git clone https://github.com/jean-m-ribeiro/simple-remote-pair.git
cd simple-remote-pair
npm install
npm run start
```

If you are the host access `http://localhost:3000/#host` in your browser, if not, just access by using the host IP in VPN or LAN, it will looks like `http://192.168.15.60:3000`

## Dependencies

Please ensure you have the required dependencies before installing:

* Windows
  * windows-build-tools npm package (`npm install --global --production windows-build-tools` from an elevated PowerShell or CMD.exe)
* Mac
  * Xcode Command Line Tools.
* Linux
  * Python (v2.7 recommended, v3.x.x is not supported).
  * make.
  * A C/C++ compiler like GCC.
  * libxtst-dev and libpng++-dev (`sudo apt-get install libxtst-dev libpng++-dev`).

Install node-gyp using npm:

```
npm install -g node-gyp
```

Then build:

```
node-gyp rebuild
```

See the [node-gyp readme](https://github.com/nodejs/node-gyp#installation) for more details.

## Planned features

- npx
- Electron app with easy usability

## Author

👤 **Jean Ribeiro**

* Website: https://jeanribeiro.dev
* Twitter: [@jeeanribeiro](https://twitter.com/jeeanribeiro)
* Github: [@jeeanribeiro](https://github.com/jeeanribeiro)
* LinkedIn: [@jeeanribeiro](https://linkedin.com/in/jeeanribeiro)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/jean-m-ribeiro/simple-pair/issues). You can also take a look at the [contributing guide](https://github.com/jean-m-ribeiro/simple-pair/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

<a href="https://www.patreon.com/jeeanribeiro">
  <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>

## 📝 License

Copyright © 2020 [Jean Ribeiro](https://github.com/jean-m-ribeiro).<br />
This project is [MIT](https://github.com/jean-m-ribeiro/simple-pair/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
