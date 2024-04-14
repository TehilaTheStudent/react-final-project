import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getByIdProductApi } from '../../features/products/productsApi'
import { postProduct, getAllProducts, putProduct } from '../../features/products/productsSlice'
import {  useDispatch } from "react-redux"

import * as statuses from '../../features/statuses'
//manager
export default function AddProduct() {
    const id = useParams().id
    const dispatchFunc = useDispatch()
    const navigateFunc = useNavigate()
    const [imagePreview, setImagePreview] = useState(null);

    const [product, setProduct] = useState({
        name: '', description: '', imageName: '', content: '', price: 0, isCooling: false, company: '', prodDate: ''
    });
    const [file, setFile] = useState(null);
    const [state, setState] = useState('add')

    useEffect(() => {
        GetProductById()
    }, [window.location.pathname])

    const GetProductById = async () => {
        console.log('use effect')
        if (Number(id)) {
            setState('update')
            const existing = await getByIdProductApi(id)
            const parts = existing.imgUrl.split('-');
            const extractedPart = parts[0].substring(parts[0].lastIndexOf('/') + 1);
            setProduct({  ...existing, imageName: extractedPart })
            setImagePreview(existing.imgUrl)
           // await getObjectUrl(existing.imgUrl);
            console.log(file)
        }
        else {
            setState('add')
            setProduct({
                name: '', description: '', imageName: '', content: '', price: 0, isCooling: false, company: '', prodDate: ''
            })
            setImagePreview(null)
        }
    }
    const handleFileChange = (event) => {
        const changedFile = event.target.files[0];
        // setProduct({ ...product, file: event.target.files[0] });
        setFile(changedFile);
        // Generate preview URL
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };

        if (changedFile) {
            reader.readAsDataURL(changedFile);
        }

    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct(prevProduct => ({ ...prevProduct, [name]: type === 'checkbox' ? checked : type=='number'?Number(value): value }));

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('product', JSON.stringify(product)); // Add product object as a JSON string


        formData.append('file', file);

        if (state == 'add') {
            dispatchFunc(postProduct(formData));
        }
        else {

            dispatchFunc(putProduct({ id: id, updatedProduct: formData }))
            dispatchFunc(getAllProducts())
            navigateFunc('/products')
            console.log('after nav')
        }
        setImagePreview(null)
        setFile(null)
        setProduct({ ...product, imageName: '', name: '', description: '', content: '', price: 0, isCooling: false, company: '', prodDate: '' });
    };
    const pressCancel=()=>{
        // navigateFunc('/products')
         navigateFunc(-1)

    }
    // const getObjectUrl = async (url) => {
    //     // Extract the filename from the URL
    //     const objectUrl = await getObjectUrlFromUrl(url);

    //     const filename = url.substring(url.lastIndexOf('/') + 1);

    //     // Create a new File object with the extracted filename
    //     setFile(new File([objectUrl], filename));

    // };
    // const getObjectUrlFromUrl = async (url) => {
    //     const response = await fetch(url);
    //     const blob = await response.blob();
    //     return URL.createObjectURL(blob);
    // };

    return (<div className="divPink">
        <p>this is the {state == 'add' ? 'addProduct' : 'updateProduct'} page</p>
        <h1 style={{textAlign:"center"}}>עדכון/הוספת מוצר</h1>

        <form onSubmit={handleSubmit}>
            <label> Name: <input type="text" name="name" value={product.name} onChange={handleChange} /> </label>
            <label> Description: <input type="text" name="description" value={product.description} onChange={handleChange} /> </label>
            <label> Content: <input type="text" name="content" value={product.content} onChange={handleChange} /> </label>
            <label> Price: <input type="number" name="price" value={product.price} onChange={handleChange} /> </label>
            <label> Cooling: <input type="checkbox" name="isCooling" checked={product.isCooling} onChange={handleChange} /> </label>
            <label> Company: <input type="text" name="company" value={product.company} onChange={handleChange} /> </label>
            <label> Production Date: <input type="text" name="prodDate" value={product.prodDate} onChange={handleChange} /> </label>
            {imagePreview && (
                <div>
                    <h2>Image Preview:</h2>
                    <img src={imagePreview} alt="Product Preview" style={{ maxWidth: '200px' }} />
                </div>
            )}
            <p> <input type="file" onChange={handleFileChange} accept="image/*"  />
                <label> Image Name: <input type="text" name="imageName" value={product.imageName} onChange={handleChange} /> </label> </p>
            <button type="submit"> {state == "add" ? "Add Product" : "Update Product"} </button>
            {state=='update'&&<button onClick={pressCancel}>cancel</button>}
        </form>
    </div>)
}


