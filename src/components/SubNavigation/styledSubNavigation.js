import styled from 'styled-components';

export default (SubNavigation) => styled(SubNavigation)`
    overflow-y: auto;
    max-width: 25rem;
    ::-webkit-scrollbar {
        display: none;
    }
`;
