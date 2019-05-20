import styled from 'styled-components';
import media from '../../styledComponents/breakPoints';

export default (SubNavigation) => styled(SubNavigation)`
	overflow-y: auto;
	flex: initial !important;
	width: 25rem !important;
	max-width: initial !important;
	min-width: initial !important;

    ::-webkit-scrollbar {
        display: none;
    }

    ${media.big`
        width: initial !important;
        max-width: 25rem !important;
    `}

    ${media.small`
        max-width: 20rem !important;
        
        .ant-menu-item{
            padding-left: 24px !important;
        };
    `}

    ${media.smallest`
        max-width: 16rem !important;
    `}
`;
