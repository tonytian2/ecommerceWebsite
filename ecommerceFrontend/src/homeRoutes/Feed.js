import Product from './Product';

const Feed = ({ products }) => {
    return (
        <div className='ProductContainer'>
            {products.map(product => (
                <Product key={product.productId} product={product} />
            ))}
        </div>
    )
}

export default Feed
