import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Instance } from '../../API/api';

//onSumit indicara que hacer, actucalizar o crear
const FormProduct = ({ isCreated, data, onSubmit }) => {

    const navigate = useNavigate();
    const [product, setProduct] = useState({ title: '', description: '', categoryId: '', price: '', images: [], });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        //se cargan las categorias del formulario
        const getData = async () => {
            const response = await Instance.get('categories');
            setCategories(response.data)
        }

        if (data || isCreated) {
            getData();
        }

        setProduct({
            id: data?.id || "",
            title: data?.title || "",
            description: data?.description || "",
            categoryId: data?.category.id || "",
            price: data?.price || "",
            images: [data?.images[0]] || [],
        });

    }, [data])

    // CAturamos el evemto de onChenge del formulario en cada input
    const change = (event) => {
        setProduct({
            ...product,
            [event.target.name]:
                event.target.name !== 'images'
                    ?
                    event.target.value
                    :
                    [event.target.value]
        })
    }

    // servira para ejecutar la funcion del onSumbit enviada del componente
    const sendForm = () => {
        onSubmit(product)

        navigate('/');

    }
    const BackPage = () => {
        navigate(-1)
    }
    
    return (
        <>
            <Container className='container-fluid bg-dark p-4 text-white text-start shadow-lg mt-5 rounded-5'>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Title:</Form.Label>
                        <Form.Control
                            required
                            value={product?.title}
                            type="text"
                            name='title'
                            placeholder="Title"
                            onChange={(event) => change(event)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>price:</Form.Label>
                        <Form.Control
                            required
                            value={product?.price}
                            type="text"
                            name='price'
                            placeholder="Price"
                            onChange={(event) => change(event)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Category:</Form.Label>
                        <Form.Select
                            required
                            value={product?.categoryId}
                            aria-label="Default select example"
                            name='categoryId'
                            onChange={(event) => change(event)}
                        >
                            <option>Seleccione una categoria</option>

                            {categories.map(category => (
                                <option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </option>

                            ))
                            }
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Images:</Form.Label>
                        <Form.Control
                            required
                            value={product?.images}
                            type="text"
                            name='images'
                            placeholder="images"
                            onChange={(event) => change(event)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                            required
                            value={product?.description}
                            name='description'
                            as="textarea"
                            placeholder="Description"
                            rows={3}
                            onChange={(event) => change(event)}
                        />
                    </Form.Group>

                    <Form.Group className="mt-5 text-center" controlId="exampleForm.ControlInput1">
                        <Button variant='danger' onClick={() => BackPage()} className='me-3 p-2 w-25'>Cancelar</Button>
                        <Button variant='success' onClick={() => sendForm()} className='w-25 p-2'>Crear</Button>
                    </Form.Group>

                </Form>
            </Container>

        </>
    );
}

export { FormProduct };