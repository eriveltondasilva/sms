import { HeaderLeft, HeaderRight, HeaderRoot } from './Header'
import {
  HeaderDropdown,
  HeaderDropdownHeader,
  HeaderDropdownItem,
} from './HeaderDropdown'

// ====================================
const Header = HeaderRoot
Header.Left = HeaderLeft
Header.Right = HeaderRight
Header.Dropdown = HeaderDropdown
Header.DropdownHeader = HeaderDropdownHeader
Header.DropdownItem = HeaderDropdownItem

export default Header
