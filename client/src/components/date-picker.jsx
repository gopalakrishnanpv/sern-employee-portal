
function DatePicker(props) {
    const required = props.required;

    return (
        <div className="relative">
            <input type={props.type ?? 'date'} id={props.id} value={props.value ?? ''}
                onChange={props?.onChange} required={required}
                className="block p-3 w-full text-sm
            text-gray-900 font-medium bg-white rounded-md border-2 border-gray-400 
             focus:outline-none focus:ring-0 focus:border-gray-500 peer" placeholder="" />
            <label htmlFor={props.id} className="absolute left-2 -top-2 
            peer-placeholder-shown:-top-2 
            text-xs font-medium 
            text-gray-500 z-10 
            bg-white px-2 
            peer-focus:text-gray-500 
            peer-focus:bg-white">{props.label?.toUpperCase()}</label>
        </div>
    )
}

export default DatePicker