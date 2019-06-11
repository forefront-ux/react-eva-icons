import * as React from 'react';

import { IconContext, DefaultContext } from './iconContext';

export interface IconTree {
  tag: string;
  attr: {[key: string]: string};
  child: IconTree[];
}


function Tree2Element(tree: IconTree[]): React.ReactElement<{}>[] {
  return tree && tree.map((node, i) => React.createElement(node.tag, {key: i, ...node.attr}, Tree2Element(node.child)));
}
export function GenIcon(data: IconTree) {
  return (rawName: string, props: IconBaseProps) => (
    <IconBase attr={{...data.attr}} {...props} svgClassName={rawName}>
      {Tree2Element(data.child)}
    </IconBase>
  );
}

export interface IconBaseProps extends React.SVGAttributes<SVGElement> {
  children?: React.ReactNode;
  size?: string | number;
  color?: string;
  title?: string;
  animation?: string;
  svgClassName?: string;
  onClick?: any;
  ariaHidden?: boolean;
}

export type IconType = (props: IconBaseProps) => JSX.Element;
export function IconBase(props:IconBaseProps & { attr: {} | undefined }): JSX.Element {
  const elem = (conf: IconContext) => {
    const computedSize = props.size || conf.size || "1em";
    let className = '';
    if (conf.className) className = conf.className;
    if (props.className) className = (className ? className + ' ' : '') + props.className;
    const {attr, title, ariaHidden = false, svgClassName, ...svgProps} = props;
    let classNameForSvg = `eva eva-${props.svgClassName}`;
    if (props.animation) {
      classNameForSvg += ` eva-animation eva-icon-hover-${props.animation}`;
    }
    return (
      <i className={`eva-hover ${className}`} onClick={props.onClick}>
        <svg
          {...conf.attr}
          {...attr}
          {...svgProps}
          fill={props.color || conf.color || 'inherit'}
          className={classNameForSvg}
          height={computedSize}
          width={computedSize}
          xmlns="http://www.w3.org/2000/svg"
        >
          {title && <title id="svg_title_id">{title}</title>}
          {props.children}
        </svg>
      </i>
    )
  };

  return IconContext !== undefined
    ? <IconContext.Consumer>{(conf: IconContext) => elem(conf)}</IconContext.Consumer>
    : elem(DefaultContext);
}
