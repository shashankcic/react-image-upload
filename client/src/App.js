import React, { useState } from 'react';
import Spinner from './Spinner';
import Images from './Images';
import Buttons from './Buttons';
import { API_URL } from './config';


export default function App() {
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState([]);

  const onChange = e => {
  	const files = Array.from(e.target.files);
  	setUploading(true);

  	const formData = new FormData();

  	files.forEach((file, i) => {
  		formData.append(i, file)
  	});

  	fetch(`${API_URL}/image-upload`, {
  		method: 'POST',
  		body: formData
  	})
  	.then(res => res.json())
  	.then(images => {
  		setUploading(false);
  		setImages(images);
  	})
  }

  const removeImage = id => {
  	setImages(images.filter(image => image.public_id !== id))
  }

  const content = () => {
  	switch(true) {
  		case uploading: 
  			return <Spinner />
  		case images.length > 0:
  			return <Images images={images} removeImage={removeImage} />
  		default:
  			return <Buttons onChange={onChange} />	
  	}
  }


  return (
    <div>
    	<div className='buttons'>
    		{content()}
    	</div>
    </div>
  );
}
