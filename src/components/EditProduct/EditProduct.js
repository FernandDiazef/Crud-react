import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { Instance } from '../../API/api';
import { FormProduct } from '../FormProduct/FormProduct';

const EditProduct = () => {

    const [product, setProduct] = useState();
    const { productId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                const response = await Instance.get(`products/${productId}`);
                setProduct(response.data);
                setLoading(false);
            } catch (e) {
                switch (e.response.data.name) {
                    case 'EntityNotFoundError':
                        alert('El producto ya fue borrado, actualize la pagina');
                        navigate('/');
                        break;
                    default:
                        break;
                }
            }

        }
        getData();
    }, []);

    const updateProduct = async (products) => {
        try {
            await Instance.put(`products/${products.id}`, products);
            navigate('/', { state: { message: `actualizates correctamente el producto con id ${products.id}` } })
        } catch (e) {
            alert(e.message);
        }
    }

    return (
        <>
            {loading && (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )
            }
            {product && (
                <FormProduct data={product} onSubmit={updateProduct} />
            )
            }
        </>
    );
};

export { EditProduct };