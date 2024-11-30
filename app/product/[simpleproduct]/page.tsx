import React from 'react'

interface Params {
  simpleproduct: string;
}

function SimpleProduct
({ params }: { params: Params }) {
  return (
    <div>SimpleProduct  {params.simpleproduct}
    </div>
  )
}

export default SimpleProduct
