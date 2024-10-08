import React, { act, useEffect, useState } from 'react';
import classes from '../styles/Settings.module.css';
import { getUser } from '@/Utils/User';
import { useAuth } from '@/contexts/authContext';
import { sendNotification } from '@/Utils/SendNotification';
import { updateLogs } from '@/Utils/UpdateLogs';

const Modal = ({ motionSensor }) => {
    const [user, setUser] = useState(null);

    const { toggle, setToggle, isMounted, setIsActiveSending, showSuccessModal, setShowSuccessModal } = useAuth();

    const handleToggle = () => {
        setToggle(!toggle);
        updateLogs('Settings', 'active', !toggle);
        if (toggle === false) {
            setIsActiveSending(false);
        }
    };

    const templateParams = {
        email: user && user?.email,
        message: `Motion detected! Date and time: ${motionSensor}`,
    };

    const handleSendNotification = () => {
        setIsActiveSending(true);
        setShowSuccessModal(sendNotification(templateParams));
    };

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
            }, 3000); // Close the modal after 2 seconds
            return () => clearTimeout(timer);
        }
    }, [showSuccessModal]);

    return (
        <div>
            <button
                className={classes.button}
                {...(!toggle && { 'data-bs-toggle': 'modal', 'data-bs-target': '#exampleModal' })}
                onClick={handleToggle}>
                {isMounted ? (!toggle ? 'Active motion' : 'Inactive') : 'Loading...'}
            </button>

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
                                backgroundColor: '#d4edda',
                                color: '#155724',
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

            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Get Information</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            Do you want to send a notification to {user?.email} and {user?.phoneNumber}?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handleSendNotification}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
