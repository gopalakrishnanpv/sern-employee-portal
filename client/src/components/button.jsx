function Button(props) {
    const disabled = props.disabled ? true : false
    return (
        < button type={props.type ?? 'button'}
            className={`${(props.bgcolor && !disabled) ? props.bgcolor : 'bg-gray-300 cursor-default'} ${props.hidden ? 'hidden' : ''} 
            w-auto text-white font-medium text-xs px-3 py-2 flex items-center justify-center gap-2 rounded-sm uppercase`}
            onClick={props.action ?? null} disabled={disabled}>
            {props.icon} {props.text}
        </button >
    )
}
export default Button