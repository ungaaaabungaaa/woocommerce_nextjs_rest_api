import React from 'react'

interface Params {
  storeid: string;
}

function StoreId({ params }: { params: Params }) {
    return (
        <>
            <br />
            <br />
            <br />
            <br />
            <div className="w-full flex align-middle justify-center flex-col h-3/4">
                StoreId {params.storeid}
            </div>
            <br />
            <br />
            <br />
            <br />
        </>
    )
}

export default StoreId
