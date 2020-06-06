import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

class Index extends React.Component {
    render() {
        return <div className="wrap">hello world</div>;
    }
}

ReactDOM.render(
    <Index />,
    document.querySelector('#root')
);
