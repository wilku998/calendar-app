import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Icon, Button } from 'antd';

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

const StyledNavigation = styled(Navigation)`
    width: 100%;
    height: 5rem;
    background-color: red;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ToggleButtonContainer=styled('div')`
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const mapStateToProps = ({ subNavigation }) => ({
	collapsed: subNavigation.collapsed
});

const mapDispatchToProps = (dispatch) => ({
	toggleCollapsed: () => dispatch({ type: 'TOGGLE_SUB_NAV' })
});

export default connect(mapStateToProps, mapDispatchToProps)(StyledNavigation);
