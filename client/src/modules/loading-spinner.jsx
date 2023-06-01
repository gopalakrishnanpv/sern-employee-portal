import { ReactComponent as Logo } from '../images/logo.svg'

function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="flex items-center justify-center">
                <div className="absolute">
                    <Logo className='w-48 h-48' />
                </div>
                <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-600 border-8 h-72 w-72"></div>
            </div>
        </div>

    )
}

export default LoadingSpinner