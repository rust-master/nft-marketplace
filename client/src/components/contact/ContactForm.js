import React, { useEffect } from 'react';
import { useForm } from '@formspree/react';
import { Link } from 'react-router-dom';

function ContactForm({ gridWidth }) {
    const [state, handleSubmit] = useForm('xnqwjgvp');
    useEffect(() => {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation');

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms).forEach(function (form) {
            form.addEventListener(
                'submit',
                function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault();
                        event.stopPropagation();
                    }

                    form.classList.add('was-validated');
                },
                false
            );
        });
    }, []);
    if (state.succeeded) {
        return (
            <div className={`${gridWidth} text-center`}>
                <p className='mb-0 fw-bold mt-5 mb-0'>
                    <i
                        className='las la-grin-beam'
                        style={{ fontSize: '10rem', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)' }}
                    ></i>
                </p>

                <h1 className='h2'>Thanks for contacting us.</h1>
                <p className='text-muted'>We'll reply back as soon as possible.</p>
                <Link to='/' className='btn btn-gradient-primary'>
                    Return Home
                </Link>
            </div>
        );
    }

    return (
        <div className={gridWidth}>
            <div className='card'>
                <div className='card-body p-4 p-lg-5'>
                    <div className='d-flex align-items-center mb-4'>
                        <div className='icon icon-md me-2 flex-shrink-0 bg-primary rounded-sm text-white'>
                            <i className='las la-pen-alt'></i>
                        </div>
                        <h2 className='h5 mb-0'>Drop us a line</h2>
                    </div>
                    <form className='contact-form needs-validation' noValidate onSubmit={handleSubmit}>
                        <div className='row gy-3'>
                            <div className='col-lg-6'>
                                <label className='form-label' htmlFor='fullname'>
                                    Full name
                                </label>
                                <div className='input-icon'>
                                    <div className='input-icon-text'>
                                        <i className='text-primary las la-user'></i>
                                    </div>
                                    <input
                                        className='form-control shadow-0'
                                        type='text'
                                        autoComplete='off'
                                        name='fullname'
                                        id='fullname'
                                        required={true}
                                        placeholder='Enter your full name'
                                    />
                                    <div className='invalid-feedback bg-danger rounded-sm text-white px-3 py-1'>
                                        Please enter your full name
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                <label className='form-label' htmlFor='email'>
                                    Email address
                                </label>
                                <div className='input-icon'>
                                    <div className='input-icon-text'>
                                        <i className='text-primary las la-envelope'></i>
                                    </div>
                                    <input
                                        className='form-control shadow-0'
                                        type='email'
                                        autoComplete='off'
                                        name='email'
                                        id='email'
                                        required={true}
                                        placeholder='Enter your email address'
                                    />
                                    <div className='invalid-feedback bg-danger rounded-sm text-white px-3 py-1'>
                                        Please enter your emaill address
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-12'>
                                <label className='form-label' htmlFor='subject'>
                                    Subject
                                </label>
                                <div className='input-icon'>
                                    <div className='input-icon-text'>
                                        <i className='text-primary las la-file-alt'></i>
                                    </div>
                                    <input
                                        className='form-control shadow-0'
                                        type='text'
                                        autoComplete='off'
                                        name='subject'
                                        id='subject'
                                        placeholder='Enter your subject'
                                    />
                                </div>
                            </div>

                            <div className='col-lg-12'>
                                <label className='form-label' htmlFor='message'>
                                    Message
                                </label>
                                <textarea
                                    className='form-control shadow-0'
                                    rows='4'
                                    name='message'
                                    id='message'
                                    placeholder='How can we help you'
                                    required={true}
                                ></textarea>
                                <div className='invalid-feedback bg-danger rounded-sm text-white px-3 py-1'>
                                    Please enter your message
                                </div>
                            </div>

                            <div className='col-lg-12'>
                                <button className='btn btn-primary w-100' type='submit' disabled={state.submitting}>
                                    <i className='las la-paper-plane me-2'></i>Send your message
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ContactForm;
