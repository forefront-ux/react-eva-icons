import React from 'react';
import EvaIcon from './EvaIcon';

export default function createEvaIcon(path, displayName) {
  const Component = React.memo(
    React.forwardRef((props, ref) => (
      <EvaIcon data-eva-test={`${displayName}`} ref={ref} {...props}>
        {path}
      </EvaIcon>
    )),
  );

  if (process.env.NODE_ENV !== 'production') {
    Component.displayName = `${displayName}`;
  }

  return Component;
};
