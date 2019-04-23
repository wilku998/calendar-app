import { css } from 'styled-components';

const sizes = {
	mid: 46.875,//750px
	small: 34.5,//550px
	smallest: 23.75//380px
};

let media = {};

Object.keys(sizes).forEach((key) => {
	media[key] = (...args) => css`@media only screen and (max-width: ${sizes[key]}rem){
        ${css(...args)}
    }`
});

export default media