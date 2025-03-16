
type FormFieldLayoutProps = {
    label?: string | any,
    id?: string;
    errorText?: string;
    children?: any;
}
export default function FormFieldLayout({ label, id, errorText, children }: FormFieldLayoutProps) {
    return (
        <div className='grid gap-1'>
            <label htmlFor={id}>{label}</label>
            {children}
            {errorText && <div className='text-red-500'>{errorText}</div>}
        </div>
    )
}
