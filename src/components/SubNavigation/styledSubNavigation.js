import styled from 'styled-components';
import media from '../../styledComponents/breakPoints';

export default (SubNavigation) => styled(SubNavigation)`
    overflow-y: auto;
    width: 25rem;
    ::-webkit-scrollbar {
        display: none;
    }

    ${media.big`
        max-width: 25rem;
        width: initial;
    `}
`;
