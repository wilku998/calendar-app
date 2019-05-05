import { css } from 'styled-components';

const sizes = {
	big: 71.25, //1140
	mid: 46.875,//750px
	small: 34.5,//550px
	smallest: 23.75//380px
};

let media = {};

Object.keys(sizes).forEach((key) => {
	media[key] = (args) => css`@media only screen and (max-width: ${sizes[key]}em){
        ${css(...args)}
    }`
});

export default media