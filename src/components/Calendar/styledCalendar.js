import styled from "styled-components";

export const styleCalendar = (Calendar) => {
  return styled(Calendar)`
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    border-bottom: ${props => props.theme.darkBorder};
    border-right: ${props => props.theme.darkBorder};
    border-top: ${props => props.theme.darkBorder};
  `
};


