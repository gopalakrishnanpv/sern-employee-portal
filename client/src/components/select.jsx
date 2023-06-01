
function Select(props) {
    return (
        <div >
            <select id={props.id} value={props.selectedValue} onChange={props.onValueChange}
                className="uppercase p-3 w-full text-xs font-medium
                text-gray-900  border-2 rounded-md border-gray-400 focus:outline-none">
                <option className="uppercase p-3 w-full text-xs font-medium" value={''}>{props.label?.toUpperCase()}</option>
                {
                    props.options.map((option, index) => (
                        <option className="uppercase p-3 w-full text-xs font-medium" key={index} value={option.value}>{option.text}</option>
                    ))
                }
            </select>
        </div >
    )
}
export default Select