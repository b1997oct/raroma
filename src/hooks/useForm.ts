import { useState } from "react"


const required_text = "$name is required"
const num_nan = "$name is NAN"
const num_min = "$name min required $min"
const num_max = "$name max is $max"

const number = ({ value, min, max }) => {
    let fValue = parseInt(value), error: string
    if (isNaN(fValue)) {
        error = num_nan
    } else if (min && fValue < min) {
        error = num_min.replace("$min", min)
    } else if (max && fValue > max) {
        error = num_max.replace("$max", max)
    }
    return { value: fValue, error }
}


const string = ({ value, minlength, maxlength }) => {
    let fValue = value?.toString() || "", error,
        len = fValue.length

    if (minlength && len < minlength) {
        error = num_min.replace("$min", maxlength).replace("$value", len)
    } else if (maxlength && len > maxlength) {
        error = num_max.replace("$max", maxlength).replace("$value", len)
    }
    return { error, value: fValue }
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validateIt = ({ required, type, value, ...props }) => {
    let f: { value: any, error: string }
    if (required && !value) {
        return { value, error: required_text }
    } else if (type == "number") {
        f = number({ ...props, value } as any)
    } else {
        f = string({ ...props, value } as any)
        if (!f.error && type == "email") {
            const valid = emailRegex.test(f.value);
            if (!valid) {
                f.error = "please enter a valid $name"
            }
        }
    }
    return f as { value: any, error: string }
}

export type UseFormSchema = {
    name: string;
    label?: any;
    error?: any;
    validator?: (any: any) => void;
    [key: string]: any
}[]

type UseFormPayload = {
    schema: UseFormSchema;
    payload?: any;
    initialValue?: any;
}

export default function useForm({ schema = [], payload, initialValue = {} }: UseFormPayload) {

    const [data, setData] = useState(initialValue)
    const [touched, setTouched] = useState(false)
    const values = {}, errors = {}, validFields = []

    for (const d of schema) {
        let { name, error, validator } = d
        let val = data[name]
        if (val == undefined && payload) {
            val = payload[name]
        }

        const setValue = (value) => {
            validFields.push(d)
            values[name] = value
        }
        if (error) {
            let validate = !validator || validator && validator(data)
            if (validate) {
                let f = validateIt({ ...error, value: val }) as any
                setValue(f.value)
                if (f.error) {
                    errors[name] = f.error.replace("$name", error.name || name)
                }
            }
        } else {
            setValue(val)
        }

    }

    const isError = () => {
        let name = Object.keys(errors)[0]
        document.getElementsByName(name)
            .forEach(d => d.focus())
        return name
    }

    const inputProps = ({ name, error: errObj, validator, ...props }: any) => {
        let errorText = errors[name]
        let value = values[name] || ""
        const onChange = e => {
            let { name: fName, value } = e.target
            setData({ ...data, [fName]: value  })
        }
        return { ...props, value, touched, name, errorText, onChange }
    }

    return { data, validFields, isError, inputProps, setData, values, touched, setTouched, errors }

}
