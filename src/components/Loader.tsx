export const Loader = () => {
    return (
            <div>
                <div className="lds-ellipsis">
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                </div>
            </div>
    )
}

export const AppLoader = () => {
    return (
        <div className="lds-wrapper">
            <Loader/>
        </div>
    )
}
