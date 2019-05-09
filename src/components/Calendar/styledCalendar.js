import styled from 'styled-components';

export default (Calendar) => styled(Calendar)`
    display: flex;
    flex-wrap: wrap;
    border-bottom: ${(props) => props.theme.darkBorder};
    border-right: ${(props) => props.theme.darkBorder};
    border-top: ${(props) => props.theme.darkBorder};
    border-radius: 0.3rem;
    overflow: hidden;
    box-shadow: 0 2rem 3rem rgba(0, 0, 0, .3);
  `;

export const DayName = styled.div`
	flex: 1 14.2857%;
  border-left: ${(props) => props.theme.darkBorder};
  border-top: ${(props) => props.theme.darkBorder};
  padding: .15rem 1rem;
  text-align: end;
`