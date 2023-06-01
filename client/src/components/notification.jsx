import { FaInfoCircle } from "react-icons/fa"
function Notification(props) {
    return <div className="w-full z-10 flex items-center justify-center">
        <div className={`flex absolute bottom-10 items-center gap-2 text-start text-white px-5 py-3 rounded-md
         ${props.bgcolor ?? 'bg-slate-600'}`}>
            <FaInfoCircle className="w-10 text-2xl" /> {props.message}
        </div>
    </div>
}
export default Notification