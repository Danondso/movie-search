import React from 'react';
import Search from '../components/Search';
import Adapter from "enzyme-adapter-react-16";
import { configure, shallow } from "enzyme";
import toJson from "enzyme-to-json";

configure({ adapter: new Adapter() });

test('Search looks correct', () => {
    const component = shallow(
        <Search />
    );
    let tree = toJson(component);
    expect(tree).toMatchSnapshot();
});