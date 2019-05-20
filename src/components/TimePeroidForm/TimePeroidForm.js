import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import setDateValues from './setDateValues';
import { StyledSelect } from './styledTimePeroidForm';

const { Option } = StyledSelect;

const TimePeroidForm = ({ optionAll, antdInputsSize, timePeroid, onDateChange, selectMargin }) => {
	const [ monthsData, yearsData ] = setDateValues(timePeroid);
	const { months, monthValue } = monthsData;
	const { years, yearValue } = yearsData;
	const onYearChange = (value) => {
		onDateChange(monthValue, value);
	};
	const onMonthChange = (value) => {
		onDateChange(value, yearValue);
	};

	return (
		<form>
			<StyledSelect
				style={{ margin: selectMargin }}
				size={antdInputsSize}
				value={yearValue}
				onChange={onYearChange}
			>
				{optionAll && <Option value="all-years">All</Option>}
				{years.map((e) => (
					<Option key={e.value} value={e.value}>
						{e.year}
					</Option>
				))}
			</StyledSelect>
			<StyledSelect
				style={{ margin: selectMargin }}
				size={antdInputsSize}
				value={monthValue}
				onChange={onMonthChange}
			>
				{optionAll && <Option value="all-months">All</Option>}
				{months.map((e) => (
					<Option key={e.value} value={e.value}>
						{e.month}
					</Option>
				))}
			</StyledSelect>
		</form>
	);
};

TimePeroidForm.propTypes = {
	onDateChange: PropTypes.func.isRequired,
	optionAll: PropTypes.bool.isRequired,
	antdInputsSize: PropTypes.string.isRequired,
	timePeroid: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	antdInputsSize: state.styles.antdInputsSize
});

export default connect(mapStateToProps)(TimePeroidForm);
