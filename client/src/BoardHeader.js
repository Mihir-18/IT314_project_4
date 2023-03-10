import Documents from './documents.png';
function BoardHeader(){
    return (
        <>
            <div className="h-20 bg-cover" style={{ backgroundColor: '#2D97E5' }}>
            </div>
            <div className="bg-dark-brighter">
                <div className="mx-6 relative flex">
                    <div className="h-20 w-20 rounded-full overflow-hidden relative -top-3 border-4 border-white bg-white">
                        <img src={Documents} />
                    </div>
                    <div className="pt-2 pl-4">
                        <h1 className="text-gray-300 text-3xl">webdev: reddit for web-development</h1>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BoardHeader