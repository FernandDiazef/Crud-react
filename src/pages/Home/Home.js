import React, { useEffect, useState } from 'react';
import { Alert, Container, Image, Spinner, Table } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { Instance } from '../../API/api';
import { ToastDelete } from '../../components/ToastDelete/ToastDelete';
import './Home.css';

const Home = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ active: false, errors: [] });
    //const [alertm, setAlerm] = useState(false);

    const location = useLocation();

    window.history.replaceState({}, document.title);

    const deleteProduct = async (id) => {
        try {
            await Instance.delete(`products/${id}`);
            getData();
        } catch (e) {
            switch (e.response.data.name) {
                case 'EntityNotFoundError':
                    alert('El dato ya fue borrado actualize la pagina, Error de conexion');
                    break;
                default:
                    break;
            };
        }
    };

    const getData = async () => {
        try {
            setLoading(true);
            const response = await Instance.get('products?offset=0&limit=10');
            setProducts(response.data);
            setLoading(false);
        } catch (e) {
            setError(
                {
                    active: true,
                    errors: ['Fallo la peticion al servidor, intente de nuevo']
                });
            setLoading(false);
        }
    }
    useEffect(() => {
        getData();

    }, []);

    return (
        <>
            <Container>
                {location.state?.message &&
                    (
                        <Alert key={1} variant={'info'} className="text-black position-absolute top-0 start-50 translate-middle mt-5">
                            {location.state?.message}
                        </Alert>
                    )
                }

                <Link to='/create' className='createTodoButton'>+</Link>
                <Table striped bordered hover variant='info' className='mt-5'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Titulo</th>
                            <th>Descripcion</th>
                            <th>Precio</th>
                            <th>Imagen</th>
                            <th>opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading
                            &&
                            <tr>
                                <td colSpan={6} className='text-center'>
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                </td>
                            </tr>
                        }

                        {error.active
                            &&
                            <tr>
                                <td colSpan={6} className='text-center'>
                                    {error.errors.map(item => (
                                        <p>{item}</p>
                                    ))}
                                </td>
                            </tr>
                        }

                        {products.map((product, index) => (
                            <tr key={product.id}>
                                <td>{index + 1}</td>
                                <td>{product.title}</td>
                                <td>{product.description}</td>
                                <td>Q{product.price.toFixed(2)}</td>
                                <td><Image src={product.images[0]} thumbnail className='img-fluid' /></td>
                                <td>
                                    <Link to={`/edit/${product.id}`} className='btn btn-success mt-4 mb-4'>Editar</Link>
                                    <ToastDelete deleteProduct={() => deleteProduct(product.id)} />
                                </td>
                            </tr>
                        ))
                        }

                        {products.length < 1 && !loading
                            &&
                            <tr>
                                <td colSpan={6} className='text-center'>
                                    <span>No hay data</span>
                                </td>
                            </tr>
                        }

                    </tbody>
                </Table>
            </Container>
        </>
    );
};

export { Home };