import { InputError } from './InputError'
import { InputHidden } from './InputHidden'
import { InputRadio } from './InputRadio'
import { InputSelect } from './InputSelect'
import { InputText } from './InputText'
import { InputTextarea } from './InputTextarea'

export const Input = Object.assign(InputText, {
  Hidden: InputHidden,
  Error: InputError,
  Text: InputText,
  Textarea: InputTextarea,
  Select: InputSelect,
  Radio: InputRadio,
})
