# react-eva-icons
React-Eva-Icons make it easier to use Eva Icons in your React component.

[![npm package](https://img.shields.io/npm/v/@forefront-ux/react-eva-icons/latest.svg)](https://www.npmjs.com/package/@forefront-ux/react-eva-icons)
[![npm downloads](https://img.shields.io/npm/dm/@forefront-ux/react-eva-icons/core.svg)](https://www.npmjs.com/package/@forefront-ux/react-eva-icons)

## Getting Started

### Installation
---
#### NPM/YARN
Install the package in your project directory with npm or yarn:

```sh
// with npm
npm install @forefront-ux/react-eva-icons

// with yarn
yarn add @forefront-ux/react-eva-icons
```

#### CDN
```
<link rel="stylesheet" type="text/css" href="https://unpkg.com/@forefront-ux/react-eva-icons-base@3.0.0/index.css" />
<script src="https://unpkg.com/@forefront-ux/react-eva-icons-base@3.0.0/index.js"></script>
```

### Usage
---
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Activity } from '@forefront-ux/react-eva-icons';
import '@forefront-ux/react-eva-icons/index.css'; // if you use CDN installation, ignore this line.

function App() {
    return (
        <Activity />
    );
};

ReactDOM.render(<App />, document.querySelector('#app'));
```
Yes, it's really all you need to get started as you can see in this live and interactive demo:

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io)

## Documentation
---
Check out our documentation website.

## Contributing
---
We'd greatly appreciate any contribution you make.

## Changelog
---
Recently Updated? Please read the [changelog](https://github.com/forefront-ux/react-eva-icons/releases).

## Thanks
---
React-Eva-Icons is only made possible thanks to these great projects that inspired us:
- [Eva Icons - A pack of more than 480 beautifully crafted Open Source icons. SVG, Sketch, Web Font and Animations support.](https://akveo.github.io/eva-icons/#/)
- [react-icons](https://github.com/react-icons/react-icons)
- [Material-UI](https://material-ui.com/)

## License
---
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details
