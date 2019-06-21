import * as React from 'react';

export interface EvaIconOptionProps {
    /**
     * Animation type for icon.
     */
    animation?: 'zoom' | 'pulse' | 'shake' | 'flip';
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
export interface EvaIconProps extends EvaIconOptionProps {
    /**
     * Node passed into the SVG element.
     */
    children: JSX.Element;
}

declare const EvaIcon: React.ComponentType<EvaIconProps>;

export default EvaIcon;
