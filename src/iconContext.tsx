import * as React from 'react';

export interface IconContext {
  color?: string;
  size?: string;
  className?: string;
  animation?: string;
  attr?: React.SVGAttributes<SVGElement>;
}

export const DefaultContext: IconContext = {
  color: undefined,
  size: undefined,
  className: undefined,
  animation: undefined,
  attr: undefined,
};

export const IconContext: React.Context<IconContext> = React.createContext && React.createContext(DefaultContext);
