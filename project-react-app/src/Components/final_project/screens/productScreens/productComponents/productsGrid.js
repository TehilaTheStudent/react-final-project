import React from 'react'
import ProductCard from "./productCard"
export default function ProductsGrid({ products, press, manager, pressDisplayProduct }) {
    return (<><div
        style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            columnGap: '30px',
            rowGap: '20px',
            justifyContent: 'space-evenly',
            padding:"20px 5px"

        }}>
        {products.map((item, index) => {
            return <React.Fragment key={index}><ProductCard product={item} press={press} manager={manager} pressDisplayProduct={pressDisplayProduct}></ProductCard></React.Fragment>
        })}
    </div >


    </>)
}