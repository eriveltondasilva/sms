import { HeaderDropdown } from './HeaderDropdown'
import { HeaderLeft } from './HeaderLeft'
import { HeaderRight } from './HeaderRight'
import { HeaderRoot } from './HeaderRoot'

export const Header = Object.assign(HeaderRoot, {
  Left: HeaderLeft,
  Right: HeaderRight,
  Dropdown: HeaderDropdown,
})
