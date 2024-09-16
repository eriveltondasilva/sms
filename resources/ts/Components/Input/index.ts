import { Checkbox } from './Checkbox'
import { Error } from './Error'
import { File } from './File'
import { Hidden } from './Hidden'
import { Radio } from './Radio'
import { Select } from './Select'
import { Text } from './Text'
import { Textarea } from './Textarea'

export const Input = Object.assign(Text, {
  Checkbox,
  File,
  Error,
  Hidden,
  Radio,
  Select,
  Text,
  Textarea,
})
