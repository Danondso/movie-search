import React from 'react';
import Header from '../components/Header';
import Adapter from "enzyme-adapter-react-16";
import { configure, shallow } from "enzyme";
import toJson from "enzyme-to-json";

configure({ adapter: new Adapter() });

test('Search renders', () => {
    const component = shallow(
        <Header />
    );
    let tree = toJson(component);
    expect(tree).toMatchSnapshot();
});