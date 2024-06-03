import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton.jsx';
import Spinner from '../components/Spinner.jsx';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .post('https://3000-yuvraj08-bookstoremern-0asjmiqry75.ws-us114.gitpod.io/books', data)
      .then(()=>{
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occured, Please Check console');
        console.log(error);
      });
  }

  return (
    <div>CreateBooks</div>
  )
}

export default CreateBooks