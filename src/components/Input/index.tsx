import React, { useId } from 'react'
import FormFieldLayout from '../FormFieldLayout';
import { Input as RSInput } from "rsuite"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: any;
    errorText?: string;
    touched?: boolean;
}


export default function Input({ label, errorText, id, touched, onChange, ...props }: InputProps) {

    const uid = useId()
    const err = touched && errorText

    if (!id) {
        id = uid
    }

    const handleChange = (_, e) => {
        let { type, value } = e.target
        if (type == "tel") {
            e.target.value = parseInt(value) || ""
        }
        onChange(e)
    }

    return (
        <FormFieldLayout id={id} errorText={err} label={label} >
            <RSInput id={id} {...props as any} onChange={handleChange} />
        </FormFieldLayout>
    )
}
