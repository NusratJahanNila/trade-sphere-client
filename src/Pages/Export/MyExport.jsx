import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthContext';

const MyExport = () => {
    const { user, loading, setLoading } = use(AuthContext);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3000/my-export?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                console.log('after my export', data)
                setProducts(data)
                setLoading(false)
            })
    }, [user, setLoading])
    if (loading) {
        return <p>Loading...</p>
    }
    return (
        <div>
            {
                products.map(product => <div className="card bg-base-100 w-96 shadow-sm">
                    <figure>
                        <img
                            src={product.productImage}
                            alt={product.productName} />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            {product.productName}
                        </h2>
                        <div className="badge badge-secondary">{product.originCountry}</div>
                        <div className="card-actions justify-end">
                            <div className="badge badge-outline">price:{product.price}</div>
                            <div className="badge badge-outline">⭐{product.rating}</div>
                            <div className="badge badge-outline">{product.availableQuantity}</div>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default MyExport;