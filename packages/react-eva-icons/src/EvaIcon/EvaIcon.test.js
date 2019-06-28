import React from 'react';
import { shallow } from 'enzyme';
import EvaIcon from './EvaIcon';

describe('<EvaIcon />', () => {
  let path;

  beforeAll(() => {
    path = <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />;
  });

  it('renders children by default', () => {
    const wrapper = shallow(<EvaIcon>{path}</EvaIcon>);
    expect(wrapper.contains(path)).toBe(true);
    expect(wrapper.find('svg').props()['aria-hidden']).toBe("true");
  });

  describe('prop: titleAccess', () => {
    it('should be able to make an icon accessible', () => {
      const wrapper = shallow(
        <EvaIcon title="Go to link" titleAccess="Network">
          {path}
        </EvaIcon>,
      );
      expect(wrapper.find('title').text()).toBe('Network');
      expect(wrapper.find('svg').props()['aria-hidden']).toBe("false");
    });
  });

  describe('prop: size', () => {
    it('should be able to change the size', () => {
      const wrapper = shallow(<EvaIcon size="24px">{path}</EvaIcon>);
      expect(wrapper.find('svg').props().width).toBe('24px');
      expect(wrapper.find('svg').props().height).toBe('24px');
    });
  });

  describe('prop: animation', () => {
    it('default zoom animation for parent hover', () => {
      const animation = 'zoom';
      const wrapper = shallow(<EvaIcon animation={animation}>{path}</EvaIcon>);
      expect(wrapper.hasClass(`eva-icon-hover-${animation}`)).toBe(true);
    });

    it('default infinite zoom animation for parent hover', () => {
      const animation = 'zoom';
      const wrapper = shallow(<EvaIcon infinite={true} animation={animation}>{path}</EvaIcon>);
      expect(wrapper.hasClass(`eva-icon-hover-${animation}`)).toBe(true);
      expect(wrapper.hasClass(`eva-infinite`)).toBe(true);
    });
  
    it('hover zoom animation', () => {
      const animation = 'zoom';
      const wrapper = shallow(<EvaIcon hover={true} animation={animation}>{path}</EvaIcon>);
      expect(wrapper.find('svg').hasClass(`eva-icon-hover-${animation}`)).toBe(true);
    });

    it('hover infinite zoom animation', () => {
      const animation = 'zoom';
      const wrapper = shallow(<EvaIcon hover={true} infinite={true} animation={animation}>{path}</EvaIcon>);
      expect(wrapper.find('svg').hasClass(`eva-icon-hover-${animation}`)).toBe(true);
      expect(wrapper.find('svg').hasClass(`eva-infinite`)).toBe(true);
    });

    it('normal zoom animation', () => {
      const animation = 'zoom';
      const wrapper = shallow(<EvaIcon hover={false} animation={animation}>{path}</EvaIcon>);
      expect(wrapper.hasClass(`eva-icon-${animation}`)).toBe(true);
    });

    it('normal infinite zoom animation', () => {
      const animation = 'zoom';
      const wrapper = shallow(<EvaIcon hover={false} infinite={true} animation={animation}>{path}</EvaIcon>);
      expect(wrapper.hasClass(`eva-icon-${animation}`)).toBe(true);
      expect(wrapper.hasClass(`eva-infinite`)).toBe(true);
    });
  });
});
