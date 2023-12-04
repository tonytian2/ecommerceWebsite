import ManageProduct from './ManageProduct';

const ProductFeed = ({ products }) => {
    return (
        <>
            {products.map(product => (
                <ManageProduct key={product.productId} product={product} />
            ))}
        </>
    )
}

export default ProductFeed