import styled from 'styled-components';

export default (Calendar) => styled(Calendar)`
    display: flex;
    flex-wrap: wrap;
    border-bottom: ${(props) => props.theme.darkBorder};
    border-right: ${(props) => props.theme.darkBorder};
    border-top: ${(props) => props.theme.darkBorder};
    border-radius: 0.3rem;
    overflow: hidden;
  `;
