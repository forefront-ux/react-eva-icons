---
title: "Usage"
metaTitle: "how to use react eva icons in react app"
metaDescription: ""
---

import { Github } from '@forefront-ux/react-eva-icons';
import '@forefront-ux/react-eva-icons/index.css';

## Simple Usage

### code
```javascript
import React from 'react';
+import { Github } from '@forefront-ux/react-eva-icons';
+import '@forefront-ux/react-eva-icons/index.css';

function GithubLink() {
    return (
        <a href="https://github.com">
-           Github
+           <Github />
        </a>
    );
}

export default GithubLink;
```

### demo
<Github />
