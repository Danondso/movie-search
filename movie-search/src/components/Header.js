import React from 'react';

class Header extends React.Component {

    test() {
        return "hi";
    };
    render() {
        return (
            <div>
            <input type="text" placeholder="movie-title"></input>
            </div>
        );
    }    
}

export default Header;