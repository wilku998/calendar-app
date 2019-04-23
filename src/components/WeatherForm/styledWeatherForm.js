import styled from 'styled-components';
import media from '../../styledComponents/breakPoints';

export default (Form) => styled(Form)`
    width: 40rem;

    ${media.small`
        width: 25rem;    
    `}

    ${media.smallest`
        width: 18rem;    
    `}
`;
