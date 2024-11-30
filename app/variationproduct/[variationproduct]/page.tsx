import React from 'react'

interface Params {
  variationproduct: string;
}

function variationproduct
({ params }: { params: Params }) {
  return (
    <div> {params.variationproduct}
    </div>
  )
}

export default variationproduct
