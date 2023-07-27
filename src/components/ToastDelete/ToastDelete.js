import React, { useState } from 'react';
import { Button, Toast } from 'react-bootstrap';

const ToastDelete = ({ deleteProduct }) => {

    const [show, setShow] = useState(false);

    return (
        <>
            <Button variant='danger' onClick={() => setShow(true)} className="mb-3 p-1 w-100">Eliminar</Button>
            <Toast onClose={() => setShow(false)} show={show} delay={3000} className="bg-warning bg-opacity-50 d-flex row align-items-center">
                <Toast.Header className=''>
                    <strong className="me-auto">Atencion</strong>
                    <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body className='bg-secondary bg-opacity-75 p-3'>
                    <div className='d-flex row justify-content-center'>
                        <Button variant='success' className='mt-1' onClick={() => setShow(false)} >No Eliminar</Button>
                        <Button variant='danger' className='mt-3' onClick={deleteProduct} >Eliminar</Button>
                    </div>

                </Toast.Body>
            </Toast>
        </>
    );
}

export { ToastDelete };