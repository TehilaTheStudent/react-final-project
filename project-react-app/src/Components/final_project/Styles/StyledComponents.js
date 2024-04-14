import styledComponents from 'styled-components'




const MyStyledDiv = styledComponents.div`
border: 2px double #bb1734;
padding-left: 3px;
padding-right: 3px;
box-shadow: inset 0 0 10px 5px rgba(0, 0, 0, 0.3);
padding-bottom: 9px;
`;

const MyStyledSpan=styledComponents.span`
margin:5px
`
const MyStyledSpanTextSpan=styledComponents.span`
margin-right:25px     ;
vertical-align:super
`
export { MyStyledDiv,MyStyledSpan ,MyStyledSpanTextSpan}
