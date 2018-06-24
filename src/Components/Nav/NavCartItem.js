import React, { Component } from 'react';

export default function NavCartItem (item) {
    console.log(item)
    return (
        <div className="cart-item-wrapper">
            <img src={ item.item.product.pic } alt={ item.item.product.product_name } />
            <div className="text-box">
            <div>
            { item.item.product.product_name } ({ item.item.line })
            </div>
            <div>
                ${ item.item.price }
            </div>
            </div>
        </div>
    )
}