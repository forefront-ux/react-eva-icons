import React from 'react';
import PropTypes from 'prop-types';

const EvaIcon = React.forwardRef(function EvaIcon(props, ref) {
  const {
    animation,
    children,
    color = 'inherit',
    focusable = false,
    height,
    hover,
    infinite = false,
    size = '1em',
    titleAccess,
    viewBox = '0 0 24 24',
    width,
    ...restProps
  } = props;

  let svgClassName = '';
  if (animation) {
    svgClassName += 'eva eva-animation';
    if (hover!==false) {
      svgClassName += ` eva-icon-hover-${animation}`;
    } else {
      svgClassName += ` eva-icon-${animation}`;
    }
    if (infinite) {
      svgClassName += ' eva-infinite';
    }
  }
  return hover ? (
    <i
      className="eva-hover"
      ref={ref}
    >
      <svg
        focusable={focusable}
        width={width || size}
        height={height || size}
        viewBox={viewBox}
        className={svgClassName}
        fill={color}
        aria-hidden={titleAccess ? 'false' : 'true'}
        role={titleAccess ? 'img' : 'presentation'}
        {...restProps}
      >
        {titleAccess ? <title>{titleAccess}</title> : null}
        {children}
      </svg>
    </i>
  ) : (
    <svg
      focusable={focusable}
      width={width || size}
      height={height || size}
      viewBox={viewBox}
      className={svgClassName}
      fill={color}
      aria-hidden={titleAccess ? 'false' : 'true'}
      role={titleAccess ? 'img' : 'presentation'}
      {...restProps}
    >
      {titleAccess ? <title>{titleAccess}</title> : null}
      {children}
    </svg>
  );
});

EvaIcon.propTypes = {
  /**
   * Animation type for icon
   */
  animation: PropTypes.oneOf(['zoom', 'pulse', 'shake', 'flip']),
  /**
   * Node passed into the SVG element.
   */
  children: PropTypes.node.isRequired,
  /**
   * Applies a color attribute to the SVG element.
   */
  color: PropTypes.string,
  /** 
   * Applies a focusable attribute to the SVG element.
  */
  focusable: PropTypes.bool,
  /** 
   * Applies a height attribute to the SVG element.
   */
  height: PropTypes.string,
  /**
   * Trigger the animation when hover on the SVG element
   */
  hover: PropTypes.bool,
  /**
   * Applies a infinite animation loop on the SVG element
   */
  infinite: PropTypes.bool,
  /** 
   * Applies a width/height attribute to the SVG element.
   */
  size: PropTypes.string,
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: PropTypes.string,
  /** 
   * Applies a viewbox attribute to the SVG element.
   */
  viewBox: PropTypes.string,
  /** 
   * Applies a width attribute to the SVG element.
   */
  width: PropTypes.string
};

export default EvaIcon;
