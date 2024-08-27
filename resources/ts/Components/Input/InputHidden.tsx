export function InputHidden({ id = '', value = '' }) {
  return <input type='hidden' id={id} name={id} value={value} />
}
