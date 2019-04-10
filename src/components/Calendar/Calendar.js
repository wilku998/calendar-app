import React, { Component } from "react";
import { connect } from "react-redux";
import { Select, Icon } from "antd";
import PropTypes from "prop-types";
import { changeMonth } from "../../actions/calendar";
import { toggleModal } from "../../actions/modal";
import {
    CalendarContainer,
    CalendarSummary,
    CalendarDay,
    DayNum,
    DayWeather,
    CalendarDayInfo,
    CalendarSummaryItem,
    StyledIcon
} from "./styledCalendar";
import contactDaysToWeather from "../../functions/contactDaysToWeather";
import { monthsData } from "../../fakedata/months";
import getSumOfBudgetItems from "../../functions/getSumOfBudgetItems";
import filterData from "../../functions/filterData";



const { Option } = Select;
class Calendar extends Component {
    state = {};

    dayClick = day => {
        const clikedMonthNum = parseInt(day.monthNum);
        const selectedMonthNum = parseInt(this.props.selectedMonth.monthNum);

        if (clikedMonthNum > selectedMonthNum) {
            this.props.changeMonth(1);
        } else if (clikedMonthNum < selectedMonthNum) {
            this.props.changeMonth(-1);
        } else {
            this.props.openModal(day);
        }
    };

    getWeather = weatherArr => {
        const half = Math.ceil(weatherArr.length / 2);
        const weather = weatherArr[half];
        const timeInt = parseInt(weather.dt_txt.split(" ")[1]);
        const pm = timeInt >= 12;
        return (
            <DayWeather>
                <span>
                    {/* <DayWeatherImage src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} /> */}
                    <span>{weather.main.temp} ℃</span>
                </span>
                <span>
                    at {pm ? timeInt - 12 : timeInt} {pm ? "p.m." : "a.m."}
                </span>
            </DayWeather>
        );
    };

    onMonthChange = value => {
        this.props.changeMonth(value);
    };
    render() {
        const { days, budget, tasksQuantity } = this.props;
        const { month, year, monthNum } = this.props.selectedMonth;
        const monthNumInt = parseInt(monthNum);
        const yearNumInt = parseInt(year);

        const years = [];
        for (let i = 0; i <= 10; i++) {
            years.push({
                year: yearNumInt + (i - 5),
                value: (i - 5) * 12
            });
        }
        const months = monthsData.map(e => ({
            ...e,
            value: e.value - monthNumInt
        }));
        return (
            <CalendarContainer>
                <CalendarSummary>
                    <form>
                        {[{ years, key: "year" }, { months, key: "month" }].map(e => (
                            <CalendarSummaryItem
                                as={Select}
                                key={e.key}
                                value={0}
                                onChange={this.onMonthChange}
                                style={{ width: "15rem" }}
                            >
                                {e[`${e.key}s`].map(subElement => (
                                    <Option key={subElement[e.key]} value={subElement.value}>
                                        {subElement[e.key]}
                                    </Option>
                                ))}
                            </CalendarSummaryItem>
                        ))}
                    </form>
                    <div>
                        <CalendarSummaryItem>Budget: {budget}$</CalendarSummaryItem>
                        <CalendarSummaryItem>Tasks: {tasksQuantity}</CalendarSummaryItem>
                    </div>
                </CalendarSummary>
                {days.map((day, i) => (
                    <CalendarDay
                        key={i}
                        disabled={day.monthNum !== monthNum}
                        onClick={() => this.dayClick(day)}
                    >
                        <DayNum>
                            {day.dayNum} {day.day}
                        </DayNum>

                        <CalendarDayInfo>
                            {day.containTasks && (
                                <span>
                                    <Icon type="book" />
                                </span>
                            )}
                            {day.containIncomes && (
                                <span>
                                    <StyledIcon color='green' type="rise" />
                                </span>
                            )}
                            {day.containExpenses && (
                                <span>
                                    <StyledIcon type="fall" />
                                </span>
                            )}
                        </CalendarDayInfo>

                        {day.weather && this.getWeather(day.weather)}
                    </CalendarDay>
                ))}
            </CalendarContainer>
        );
    }
}

Calendar.propTypes = {
    days: PropTypes.array,
    selectedMonth: PropTypes.object
};

const mapStateToProps = state => {
    const { visibleDays, selectedMonth } = state.calendar;
    const { tasks, incomes, expenses } = state.items;


    const [thisMonthTasks, thisMonthIncomes, thisMonthExpenses] = [
        tasks,
        incomes,
        expenses
    ].map(items => {
        return items.length > 0 ? filterData(items, selectedMonth) : [];
    });

    const days = contactDaysToWeather(visibleDays, state.weather).map(e => ({
        ...e,
        containTasks:
            thisMonthTasks.length > 0
                ? filterData(thisMonthTasks, e).length > 0
                : false,
        containExpenses:
            thisMonthExpenses.length > 0
                ? filterData(thisMonthExpenses, e).length > 0
                : false,
        containIncomes:
            thisMonthIncomes.length > 0
                ? filterData(thisMonthIncomes, e).length > 0
                : false
    }));

    return {
        days,
        selectedMonth,
        tasksQuantity: thisMonthTasks.length,
        budget:
            getSumOfBudgetItems(thisMonthIncomes) -
            getSumOfBudgetItems(thisMonthExpenses)
    };
};

const mapDispatchToProps = dispatch => ({
    changeMonth: diff => dispatch(changeMonth(diff)),
    openModal: selectedDay => dispatch(toggleModal(true, selectedDay))
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Calendar);
