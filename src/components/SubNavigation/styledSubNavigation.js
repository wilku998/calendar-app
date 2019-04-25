import styled from 'styled-components';
import media from '../../styledComponents/breakPoints';

export default (SubNavigation) => styled(SubNavigation)`
    height: 100%;
    overflow-y: auto;
    max-width: 25rem;
    ::-webkit-scrollbar {
        display: none;
    }
`;
