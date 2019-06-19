# react-eva-icons-base
React-Eva-Icons-Base make it easier to wrapper Eva Icons in svg as a React component.

[![npm package](https://img.shields.io/npm/v/@forefront-ux/react-eva-icons-base/latest.svg)](https://www.npmjs.com/package/@forefront-ux/react-eva-icons-base)
[![npm downloads](https://img.shields.io/npm/dm/@forefront-ux/react-eva-icons-base/core.svg)](https://www.npmjs.com/package/@forefront-ux/react-eva-icons-base)

## Getting Started

### Installation
---
#### NPM/YARN
Install the package in your project directory with npm or yarn:

```sh
// with npm
npm install @forefront-ux/react-eva-icons-base

// with yarn
yarn add @forefront-ux/react-eva-icons-base
```

#### CDN
```
<link rel="stylesheet" type="text/css" href="https://unpkg.com/@forefront-ux/react-eva-icons-base@2.0.5/index.css" />
<script src="https://unpkg.com/@forefront-ux/react-eva-icons-base@2.0.5/index.js"></script>
```

### Usage
---
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Activity } from '@forefront-ux/react-eva-icons-base';
import '@forefront-ux/react-eva-icons-base/index.css'; // if you use CDN installation, ignore this line.

function App() {
    return (
        <i className="eva-hover">
            <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                fill="#000"
                className="eva eva-activity eva-animation eva-icon-hover-zoom"
            >
                <Activity />
            </svg>
        </i>
    );
};

ReactDOM.render(<App />, document.querySelector('#app'));
```
Yes, it's really all you need to get started as you can see in this live and interactive demo:

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io)

## Questions
---
For how-to questions and other non-issues, please use StackOverflow instead of Github issues. There is a StackOverflow tag called "material-ui" that you can use to tag your questions.

## Examples
---
Are you looking for an example project to get started? We host some.

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
React-Eva-Icons-Base is only made possible thanks to these great projects that inspired us:
- [Eva Icons - A pack of more than 480 beautifully crafted Open Source icons. SVG, Sketch, Web Font and Animations support.](https://akveo.github.io/eva-icons/#/)
- [react-icons](https://github.com/react-icons/react-icons)
- [Material-UI](https://material-ui.com/)

## License
---
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details
