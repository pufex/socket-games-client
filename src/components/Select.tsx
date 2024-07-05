import type { RegisterOptions } from "react-hook-form"
import { useState, useEffect } from "react"
import { useFormContext } from "react-hook-form"

import { cn } from "../utils/cn"

export type SelectListItem = {
    name: string,
    value: string,
}

export type SelectProps = {
    name: string,
    registerOptions: RegisterOptions,
    list: SelectListItem[],
    defaultValue?: string,
    className?: string,
    children?: React.ReactNode,
    placeholder?: string
}

const Select = ({
    name,
    registerOptions,
    list,
    defaultValue,
    className = "",
    children,
    placeholder,
}: SelectProps) => {

    const {register, setValue, getValues} = useFormContext()

    const [show, setShow] = useState(false)

    const value = getValues(name)
    useEffect(() => setShow(false), [value])

    return <div 
        className={cn("select__wrapper", className)}
    >
        {
            children
                && <label className="select__label">
                    {children}
                </label>
        }
        <div className="select__main">
            <div className="select__input-container">
                <input 
                    {...register(name, registerOptions)}
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    readOnly
                    defaultValue={defaultValue}
                />
                <button
                    className="select__toggle"
                    onClick={() => setShow(prev => !prev)}
                    type="button"
                >
                    {
                        !show
                            ? "show"
                            : "hide"
                    }
                </button>
            </div>
            {
                show 
                    ? list.length 
                        ? <ul className="select__list">
                            {
                                list.map((item) =>{ 
                                    const handleClick = () => {
                                        setValue(name, item.value);
                                        setShow(false)
                                    }
                                    return (
                                        <li
                                            className="select__item"
                                            onClick={handleClick}
                                        >
                                            {item.name}
                                        </li>
                                    )
                                })   
                            }
                        </ul>
                        : <span className="select--empty">
                            Empty
                        </span>
                    : null
            }
        </div>
    </div>
}

export default Select
