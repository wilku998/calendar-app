import styled from "styled-components";
import { Icon, Select } from "antd";

export const StyledIcon = styled(Icon)`
  color: ${props => props.color==='green' ? props.theme.colorGreen : props.theme.colorRed};
`;

export const CalendarSummaryItem = styled.span`
  &:not(:last-child) {
    margin-right: 1.5rem;
  }
`;
export const CalendarDayInfo = styled.span`
  position: absolute;
  top: 0.7rem;
  left: 0.7rem;

  & > * {
    display: block;
    &:not(:last-child) {
      margin-bottom: 0.5rem;
    }
  }
`;
export const CalendarContainer = styled.div`
  width: 70.1rem;
  display: flex;
  flex-wrap: wrap;
  border-bottom: ${props => props.theme.greyBorder};
  border-right: ${props => props.theme.greyBorder};
  border-top: ${props => props.theme.greyBorder};
`;
export const CalendarDay = styled.div`
  width: 10rem;
  height: 10rem;
  border-top: ${props => props.theme.greyBorder};
  border-left: ${props => props.theme.greyBorder};
  background: ${props =>
    props.disabled ? props.theme.colorGreyLight3 : props.theme.colorGreyLight1};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 1.2rem;
  padding: 0.7rem;
  line-height: 1;
  position: relative;
`;
export const DayNum = styled.span`
  align-self: flex-end;
`;

export const DayWeather = styled.div`
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  & > span {
    &:first-child {
      margin-bottom: 0.3rem;
    }
  }
`;

export const DayWeatherImage = styled.img`
  height: 2.5rem;
  width: 2.5rem;
  margin-left: -0.5rem;
`;
export const CalendarSummary = styled.div`
  width: 70.1rem;
  font-size: 1.6rem;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: ${props => props.theme.greyBorder};
  background: ${props => `linear-gradient(to right bottom, ${props.theme.colorGreyLight2}, ${props.theme.colorGreyLight3})`};
`;
