function LazyDummy() {
    return (
        <li className="flex items-center gap-3 p-1 rounded-lg animate-pulse">
            <div className="w-11 h-11 p-1 bg-gray-200 rounded-md" />
            <div className="min-w-0 w-50">
                <div className="bg-gray-200 w-3/4 h-2 rounded-lg"></div>
                <div className="bg-gray-200 w-1/2 h-2 mt-1 rounded-lg"></div>
            </div>
            <div className="ml-auto bg-gray-200 w-1/4 h-2 rounded-lg"></div>
        </li>
    )
}

export default LazyDummy;