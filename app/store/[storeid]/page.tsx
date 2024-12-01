"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FullScreenStoreBanner from '@/app/component/FullScreenStoreBanner';

interface Params {
  storeid: string;
}

function StoreId({ params }: { params: Params }) {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`/api/getproduct`, { params: { storeid: params.storeid } })
      .then((response) => {
        if (response.data && response.data.products && response.data.products.length > 0) {
          setProducts(response.data.products);
          // if the product count is zero show no product is found is in this categoriy 
          // contunie shoping button thats take to home 
        } else {
          setError('No products found for this category.');
        }
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setError('An error occurred while fetching products.');
      });
  }, [params.storeid]);

  return (
    <>
    <div>
        {/*
         
        filteers responsive  - Hard & God Knows How 
        product grid with add to cart & Props   - Mangable  

        */}

       <FullScreenStoreBanner
        title="Welcome to Studio Universe"
        subtitle={params.storeid}
        />
        <br></br>


    </div>
    </>
  );
}

export default StoreId;
