---
title: "Props"
metaTitle: "props"
metaDescription: "props of react eva icons"
---

import { Github } from '@forefront-ux/react-eva-icons';
import '@forefront-ux/react-eva-icons/index.css';

## Props
Property | Type | Required | Default | Description | Demo
--- | --- | --- | --- | --- | ---
animation | string | no | undefined | set animation on icon, `zoom`,`shake`,`pulse`,`flip` | <Github hover={false} animation="zoom" infinite={true} /> zoom <Github hover={false} animation="shake" infinite={true} /> shake <Github hover={false} animation="pulse" infinite={true} /> pulse <Github hover={false} animation="flip" infinite={true} /> flip
focusable | boolean | no | undefined | if `true`, set focusable on icon | <Github  focusable={true} />
width | string | no | same as size or 1em | set width on icon | <Github width="20px" height="20px" /> 20px
height | string | no | same as size or 1em | set height on icon | <Github width="20px" height="20px" /> 20px
size | string | no | 1em | set size(width/height) on icon |<Github size="24px" /> 24px
color | string | no | undefined | set color on icon | <Github color="red" /> red
titleAccess | string | no | undefined | set title on icon for a11y requirement | <Github titleAccess="GitHub" />
hover | boolean | no | undefined | if `true`, set hover trigger for animation effect on icon | <Github hover={true} animation="zoom" />
infinite | boolean | no | undefined | if `true`, set animation loop times to infinite | <Github hover={true} animation="zoom" infinite={true} />
