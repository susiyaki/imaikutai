import styled from "@emotion/styled";

export default styled.div`
  background-color: ${props => props.bgColor};
  height: ${props => props.height};
  width: ${props => props.width};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  display: ${props =>
    props.justifyContent || props.alignItems ? "flex" : "block"};
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};
  flex-direction: ${props => props.flexDirection};
`;
