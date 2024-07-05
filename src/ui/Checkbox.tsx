import type { RegisterOptions } from "react-hook-form"

import { useFormContext } from "react-hook-form"

import { FaCheck as Check } from "react-icons/fa6";

import { cn } from "../utils/cn";

type CheckboxProps = {
    name: string,
    registerOptions?: RegisterOptions,
    defaultChecked?:boolean,
    children?: React.ReactNode,
    errorMessage?: string,
    className?: string
}

const Checkbox = ({
    name,
    registerOptions,
    children,
    errorMessage,
    className,
}: CheckboxProps) => {

    const {register, watch, setValue} = useFormContext()
    register(name, registerOptions)
    const checkboxValue = watch(name)

    const handleClick = () => {
        setValue(name, !checkboxValue)
    }

    return <>
        <div 
            className={cn(
                "checkbox__wrapper",
                className ?? ""
            )}
        >
            <div 
                className={cn(
                    "checkbox__checkbox",
                    checkboxValue ? "active" : ""
                )}
                onClick={handleClick}
            >
                {
                    checkboxValue
                        && <Check className="checkbox__check"/> 
                }
            </div>
            {
                children
                    && <label 
                        className="checkbox__label"
                    >
                        {children}
                    </label>
            }
            {
                errorMessage
                    && <label 
                        className="checkbox__label--error"
                    >
                        {errorMessage}
                    </label>
            }
        </div>
    </>
}

export default Checkbox
