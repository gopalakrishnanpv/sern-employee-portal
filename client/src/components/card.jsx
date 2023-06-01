
function Card(props) {
    return (
        <div className={`rounded-lg overflow-hidden drop-shadow-lg p-0 sm:p-0 md:p-5 shadow-gray-500 ${props.bgcolor}`}>
            <div className='p-5'>
                <div className={`text-white font-medium text-sm sm:text-sm md:text-md lg:text-lg xl:text-xl mb-3`}>{props.title}</div>
                <p className={`text-white font-medium text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl`}>
                    {props.count}
                </p>
            </div>
        </div>
    )
}
export default Card