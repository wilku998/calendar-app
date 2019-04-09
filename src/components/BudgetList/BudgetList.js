import React from 'react';
import styled from 'styled-components';
import numeral from 'numeral';

const BudgetList =  ({ items, title, className }) => {
    return (
        <div className={className}>
            <h3>{title}</h3>
            <ul>
                {items.map((item, i) => (
                    <li key={`${item.title}-${i}`}>
                        <span>{item.title}</span>
                        <span>{numeral(item.value).format('$0,0.00')}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default styled(BudgetList)`
    flex: 1;
	&:not(:last-child){
		margin-right: 2rem;
    };
    
    & > h3{
        margin-bottom: 0;
    }
    & > ul {
        list-style: none;
        margin-bottom: 0;

        & > li {
            padding: .5rem 0;
            display: flex;
            justify-content: space-between;
            &:not(:last-child){
                border-bottom: ${(props) => props.theme.lightBorder}
            }
        }
    }
`
