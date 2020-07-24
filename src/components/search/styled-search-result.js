import styled, { css } from "styled-components"
import SearchResult from "./search-result"

const Popover = css`
  width: 80vw;
  max-height: 80vh;
  -webkit-overflow-scrolling: touch;
  top: 100%;
  background: ${({ theme }) => theme.background};
`

export default styled(SearchResult)`
  display: ${props => (props.show ? `block` : `none`)};
  ${Popover}
`
