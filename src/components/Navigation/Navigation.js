import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Button } from 'antd';

import { ToggleButtonContainer, styleNavigation } from './StyledNavigation';
import WeatherForm from "../WeatherForm";

class Navigation extends Component {
	state = {};

	render() {
		const { className, collapsed, toggleCollapsed } = this.props;
		return (
			<div className={className}>
                <ToggleButtonContainer>
                    <Button type="primary" onClick={toggleCollapsed}>
                        <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
                    </Button>
                </ToggleButtonContainer>

                <WeatherForm />
                <button>logout</button>
			</div>
		);
	}
}

const mapStateToProps = ({ subNavigation }) => ({
	collapsed: subNavigation.collapsed
});

const mapDispatchToProps = (dispatch) => ({
	toggleCollapsed: () => dispatch({ type: 'TOGGLE_SUB_NAV' })
});

export default connect(mapStateToProps, mapDispatchToProps)(styleNavigation(Navigation));
