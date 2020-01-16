import React, { Component } from 'react';
// import PropTypes from 'prop-types';

export default class OutsideAlerter extends Component {
    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef = (node) => {
        this.wrapperRef = node;
    }

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.props.onOutside();
        }
    }

    render() {
        return <div ref={this.setWrapperRef}>{this.props.children}</div>;
    }
}

// OutsideAlerter.propTypes = {
//   children: PropTypes.element.isRequired,
// };
