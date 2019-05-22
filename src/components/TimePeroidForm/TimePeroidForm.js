import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import setSelectOptions from './setSelectOptions';
import Select from './Select';

const { Option } = Select;
const { months, years } = setSelectOptions();

const TimePeroidForm = ({ optionAll, antdInputsSize, timePeroid, onDateChange, selectMargin = '0 1.5rem 0 0' }) => {
	const monthValue = timePeroid.month === 'all-months' || months.find((e) => e.month === timePeroid.month).value;
	const yearValue = timePeroid.year === 'all-years' || years.find((e) => e.year === timePeroid.year).value;

	const onYearChange = (value) => {
		onDateChange(monthValue, value);
	};
	const onMonthChange = (value) => {
		onDateChange(value, yearValue);
	};
	return (
		<form>
			<Select margin={selectMargin} size={antdInputsSize} value={yearValue} onChange={onYearChange}>
				{optionAll && <Option value="all-years">All</Option>}
				{years.map((e) => (
					<Option key={e.value} value={e.value}>
						{e.year}
					</Option>
				))}
			</Select>
			<Select margin={selectMargin} size={antdInputsSize} value={monthValue} onChange={onMonthChange}>
				{optionAll && <Option value="all-months">All</Option>}
				{months.map((e) => (
					<Option key={e.value} value={e.value}>
						{e.month}
					</Option>
				))}
			</Select>
		</form>
	);
};

TimePeroidForm.propTypes = {
	onDateChange: PropTypes.func.isRequired,
	optionAll: PropTypes.bool.isRequired,
	antdInputsSize: PropTypes.string.isRequired,
	timePeroid: PropTypes.shape({
		year: PropTypes.string.isRequired,
		month: PropTypes.string.isRequired,
		monthNum: PropTypes.string.isRequired
	}).isRequired,
	selectMargin: PropTypes.string
};

const mapStateToProps = (state) => ({
	antdInputsSize: state.styles.antdInputsSize
});

export default connect(mapStateToProps)(TimePeroidForm);
