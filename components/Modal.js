import React, { useEffect, useState, useContext } from 'react';
import classes from '../styles/Settings.module.css';
import { getUser } from '@/components/User';
import emailjs from '@emailjs/browser';
import { useAuth } from '@/contexts/authContext'; // Make sure this import path is correct

const Modal = ({ motionSensor }) => {
    const [user, setUser] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Use the useAuth hook to access the context
    const { toggle, setToggle } = useAuth();

    const templateParams = {
        email: user && user.email,
        message: `Motion detected! Date and time: ${motionSensor}`,
    };

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.send('service_4vkg8rt', 'template_xy8r1wm', templateParams, 'y5i1qRrGaPmu-RuIp')
            .then((result) => {
                setShowSuccessModal(true);
            }, (error) => {
                console.log(error.text);
            });
    }

    useEffect(() => {
        getUser(setUser);
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.bootstrap) {
            const modalElement = document.getElementById('exampleModal');
            const modal = new window.bootstrap.Modal(modalElement);
            modal.show();
        }
    }, []);

    useEffect(() => {
        if (showSuccessModal) {
            const timer = setTimeout(() => {
                setShowSuccessModal(false);
            }, 20000); // Close the modal after 20 seconds
            return () => clearTimeout(timer);
        }
    }, [showSuccessModal]);


    return (
        <div>
            {/* Button trigger modal */}
            <button
                className={classes.button}
                {...(!toggle && { 'data-bs-toggle': 'modal', 'data-bs-target': '#exampleModal' })}
                onClick={() => setToggle(!toggle)}>
                {!toggle ? 'Active' : 'Inactive'}
            </button>

            {/* Success Modal */}
            {showSuccessModal && (
                <div
                    className="modal fade show"
                    tabIndex={-1}
                    aria-labelledby="successModalLabel"
                    aria-modal="true"
                    role="dialog"
                    style={{ display: 'block' }}
                >
                    <div className="modal-dialog">
                        <div
                            className="modal-content"
                            style={{
                                backgroundColor: '#d4edda', // Pale green
                                color: '#155724', // Darker green for text
                                fontWeight: 'bold',
                                fontFamily: '"Fira Code Nerd Font", monospace',
                            }}
                        >
                            <div className="modal-header">
                                <h5 className="modal-title" id="successModalLabel">
                                    <i
                                        className="bi bi-check-circle-fill"
                                        style={{ color: '#155724', marginRight: '10px' }}
                                    ></i>
                                    Success!
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowSuccessModal(false)}
                                />
                            </div>
                            <div className="modal-body">
                                The email has been sent successfully!
                                <div style={{ marginTop: '10px' }}>
                                    {user && (
                                        <a
                                            href={`mailto:${user.email}`}
                                            style={{ color: '#155724', textDecoration: 'underline' }}
                                        >
                                            Open your email
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Get Information</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            Do you want to send a notification to {user && user.email} and {user && user.phoneNumber}?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={sendEmail}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;






