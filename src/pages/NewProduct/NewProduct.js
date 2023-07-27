import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Instance } from '../../API/api';
import { FormProduct } from '../../components/FormProduct/FormProduct';

const NewProduct = () => {

    const navigate = useNavigate();

    const createProduct = async (product) => {
        try {
            await Instance.post('products', product);
            navigate('/', {state: {message: "Se creo un nuevo producto"}});
        } catch (e) {
            alert(e.message);
        }
    };

    return (
        <>
            <FormProduct onSubmit={createProduct} isCreated={true} />
        </>
    );
}

export { NewProduct };