import styled from 'styled-components';

export const TitleContainer = styled('div')`
    display: flex;
    align-items: center;
    line-height: 1;
`;

export const ItemTitle = styled('h3')`
    display: inline-block;
    margin-bottom: 0;
    font-size: 1.4rem;
    font-weight: 400;
`;

export const RemoveButton = styled('button')`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    margin-right: 1.5rem;

    &:hover{
        color: ${(props) => props.theme.colorBlue}
    }
    &:focus{
        outline:none;
    }
`;

export const TaskDescription = styled('p')`
    flex: 1 1 100%;
    margin: .5rem 0 0 0;
`;

export const List = styled('ul')`
    list-style: none;
    margin-bottom: 0;
`;

export const ListItem = styled('li')`
        padding: ${props => props.padding==='big' ? '1rem 0' : '.5rem 0'};
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        &:not(:last-child){
            border-bottom: ${(props) => props.theme.lightBorder}
        }
`