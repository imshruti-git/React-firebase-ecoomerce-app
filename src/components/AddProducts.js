import React, { useState } from 'react'
import { fs, storage } from '../firebase'

const AddProducts = () => {
    const [productName, setProductName] = useState('');
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState('');
    const [uploadImage, setUploadImage] = useState(null);
    
    const [errormsg, setErrormsg] = useState('');
    const [successmsg, setSuccessmsg] = useState('');
    const [imageError, setImageError] = useState(null);

    console.log(productName, desc, price)

    const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG', 'image/svg', 'image/SVG'];
    const handleImgaeUpload = (e) =>{
        let selectedFile = e.target.files[0];
        if (selectedFile){
            if (selectedFile&&types.includes(selectedFile.type)){
              setUploadImage(selectedFile);
              setImageError('');
            }
            else{
              setUploadImage(null);
              setImageError('select a valid image type');
            }
          }
          else{
            console.log('please select your file');
          }
    }

    const handleAddProducts =(e) =>{
        e.preventDefault();
       console.log(productName, desc, price, uploadImage)
       const taskUpload = storage.ref(`product-images/${uploadImage.name}`).put(uploadImage);
       taskUpload.on('state_changed', snapshot =>{
         const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
         console.log(progress);
       }, error=>setErrormsg(error.message), ()=>{
         storage.ref('product-images').child(uploadImage.name).getDownloadURL().then(url=>{{
           fs.collection('Products').add({
             productName,
             desc,
             price: Number(price),
             url
           }).then(()=>{
             setSuccessmsg('Product added successfully');
             setProductName('');
             setDesc('');
             setPrice('')
             document.getElementById('file').value='';
             setImageError('');
             setErrormsg('');
             setTimeout(()=>{
                setSuccessmsg('');
             },3000)
           }).catch(error=>setErrormsg(error.message));
         }})
       })
    }
  return (
    <div className='container mb-5 mt-5'>
        <h2>Add Products</h2><br/>
        {successmsg&&<>
            {successmsg}
        </>}
        <form className='form-group' onSubmit={handleAddProducts}>
                <label class="form-label">Product name</label>
                <input type="text"
                       class="form-control" 
                       onChange={(e) => setProductName(e.target.value)}
                       value={productName} />
                <br/>
                <label class="form-label">Product Description</label>
                <input type="text" 
                       class="form-control" 
                       onChange={(e) => setDesc(e.target.value)}
                       value={desc} />
                <br/>
                <label class="form-label">Product price</label>
                <input type="number" 
                       class="form-control"
                       onChange={(e) => setPrice(e.target.value)}
                       value={price}/>
                <br/>
                <label class="form-label">Upload Image</label>
                <input type="file" id='file' 
                       class="form-control"
                       onChange={handleImgaeUpload}
                />
                <br/>
                {imageError&&<>
                    {imageError}
                </>}
                <div className='d-flex justify-content-between'>
                <button type='submit' className='btn-success'>Add Products</button>
                </div>
             </form>
             {errormsg&&<>
                {errormsg}
             </>}
          
    </div>
  )
}

export default AddProducts