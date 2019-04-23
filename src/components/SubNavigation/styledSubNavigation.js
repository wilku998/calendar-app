import styled from 'styled-components';
import media from '../../styledComponents/breakPoints';

export default (SubNavigation) => styled(SubNavigation)`
    flex: 0 0 ${(props) => (props.collapsed ? '80px' : '25rem')};
    transition: width .3s;
    max-height: 100%;
    overflow-y: auto;

    ::-webkit-scrollbar {
        display: none;
    }
`;
