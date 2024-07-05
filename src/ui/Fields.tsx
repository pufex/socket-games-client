import { cn } from "../utils/cn"

type FieldElementType = {
  className?: string
}

type FieldsProps = {
  children: React.ReactNode,
  className?: string
} & FieldElementType

export const Fields = ({
  children,
  className = ""
}: FieldsProps) => {
  return <ul 
    className={cn(
      'fields__list',
      className
    )}
  >
    {children}
  </ul>
}

type FieldProps = {
  name: string,
  value: string,
} & FieldElementType

export const Field = ({
  name, 
  value, 
  className = ""
}: FieldProps) => {
  return <li 
    className={cn(
      'fields__item',
        className
    )}
  >
    <span className='fields__item__key'>
      {name}
    </span>
    <span className='fields__item__value'>
      {value}
    </span>
  </li>
}
