export default function JobCard(props) {
    return (
        <div className="h-screen flex items-center justify-center bg-white">
            <div className="grid grid-cols-12 px-18 gap-5">
            <div className="col-span-3 bg-rose-700 rounded-xl h-52 md:h-80">
                {props.destination}
                {props.days}
            </div>
        
             </div>
        </div>
    )
}