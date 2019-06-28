import * as React from 'react';
export interface EvaIconProps {
    /**
     * Animation type for icon.
     */
    animation?: 'zoom' | 'pulse' | 'shake' | 'flip';
    /**
     * Node passed into the SVG element.
     */
    children: JSX.Element;
    /**
     * Applies a color attribute to the SVG element.
     */
    color?: string;
    /**
     * Applies a focusable attribute to the SVG element.
     */
    focusable?: boolean;
    /**
     * Applies a height attribute to the SVG element.
     */
    height?: string;
    /**
     * Trigger the animation when hover on the SVG element
     */
    hover?: boolean;
    /**
     * Applies a infinite animation loop on the SVG element
     */
    infinite?: boolean;
    /**
     * Provides a human-readable title for the element that contains it.
     * https://www.w3.org/TR/SVG-access/#Equivalent
     */
    size?: string;
    /**
     * Applies a11y attributes to SVG element.
     */
    titleAccess?: string;
    /**
     * Applies a viewbox attribute to the SVG element.
     */
    viewBox?: string;
    /**
     * Applies a width attribute to the SVG element.
     */
    width?: string;
}

declare const EvaIcon: React.ComponentType<EvaIconProps>;

export default EvaIcon;
