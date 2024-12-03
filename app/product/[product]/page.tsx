import React from 'react'

interface Params {
  product: string;
}

// make the api call get all the product details 
// second if the product is simple dont make the api call and get the variations details 

function SimpleProduct
({ params }: { params: Params }) {

  // {params.product}
  
  return (
    <div>Product View {params.product}</div>
  )
}

export default SimpleProduct
