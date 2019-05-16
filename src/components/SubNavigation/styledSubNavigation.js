import styled from 'styled-components';
import media from '../../styledComponents/breakPoints';

export default (SubNavigation) => styled(SubNavigation)`
    overflow-y: auto;
    width: 25rem;

    @supports (::-webkit-scrollbar){
        ::-webkit-scrollbar {
        display: none;
    }
    }


    ${media.big`
        max-width: 25rem;
        width: initial;
    `}

    ${media.small`
        max-width: 20rem;
    `}

    ${media.smallest`
        max-width: 16rem;
    `}
`;
