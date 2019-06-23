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
    it('should be able to change the animation', () => {
      const animation = 'zoom';
      const wrapper = shallow(<EvaIcon animation={animation}>{path}</EvaIcon>);
      expect(wrapper.find('svg').hasClass(`eva-icon-hover-${animation}`)).toBe(true);
    });
  });
});
