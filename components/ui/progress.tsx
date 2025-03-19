type progressProps={
    value:string
}
export default function Progress({value}:progressProps) {
    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-orange-600 h-2.5 rounded-full" style={{ width: value }}></div>
        </div>
    )
}
