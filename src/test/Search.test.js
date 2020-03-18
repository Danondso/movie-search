import React from 'react';
import Search from '../components/Search';
import renderer from 'react-test-renderer';

test('Search looks correct', () => {
    const component = renderer.create(
        <Search />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});