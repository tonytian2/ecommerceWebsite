import { useContext, useState } from 'react';
import DataContext from '../context/DataContext';
import NeedToLogin from '../components/NeedToLogIn';
import productsApi from '../api/products'

const CreateProduct = () => {
    const {products, setProducts, navigate, clearLocalStorageCredentials } =useContext(DataContext)
    const [productName, setProductName] = useState("")
    const [price, setPrice] = useState("")
    const [imageURL, setImageURL] = useState("")
    const [description, setDescription] = useState("")
    const [createPMessage, setCreatePMessage ] = useState("")
    const handleCreateProduct = async (e) => {
        e.preventDefault();
        try {
            const product = {
                productName: `${productName}`,
                createdTime: Date.now(),
                price: `${price}`,
                imageURL:`${imageURL}`,
                description:`${description}`,
                soldQuantity:0,
                username: `${localStorage.getItem("username")}`,
            }
            
            const response = await productsApi.post("/", product,  {headers: { authorization: 'Basic ' + window.btoa(localStorage.getItem("username")+ ":" + localStorage.getItem("password"))   }} )
            setProducts([...products, response.data])
            setCreatePMessage(`Product "${product.productName}" created successfully.`)
        } catch (err) {
            if (err.response) {
                 
                if(err.response.status == 401){
                    await clearLocalStorageCredentials()
                    navigate("/wrongcredentials")
                    return
                }
                
                setCreatePMessage(`${err.response.data}`)
                
            }else{
                setCreatePMessage(`${err.message}`)
            } 
        }
      }
    return (
        <>
            {localStorage.getItem("username") == undefined ? 
                ( <NeedToLogin />
                ):
                (<div className="CreateProduct">
                    <h2> Create a new product.</h2>
                    <h4> {createPMessage} </h4>
                    <form className="CreateProductForm" onSubmit={handleCreateProduct}>
                        <input 
                            type="text" 
                            required
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            placeholder="Product Name" />
                        <input 
                            type="text" 
                            placeholder="Price"
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)} />
                        <input 
                            type="text" 
                            placeholder="Image URL"
                            required
                            value={imageURL}
                            onChange={(e) => setImageURL(e.target.value)} />
                        <textarea 
                            type="text" 
                            placeholder="Product Description" 
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}/>
                        <button>Submit</button>
                    </form>
                </div>)
            }
        </>
        
    )
}

export default CreateProduct