import React, { useEffect, useState } from 'react';
import classes from '../styles/Settings.module.css';
import { getUser } from '@/components/User';
import emailjs from '@emailjs/browser';
const Modal = ({ handlePushData }) => {
    const [user, setUser] = useState(null);

    const templateParams = {
        email: user && user.email,
        message: 'Fill data here',

    };

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.send('service_4vkg8rt', 'template_xy8r1wm', templateParams, 'y5i1qRrGaPmu-RuIp')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }


    useEffect(() => {
        getUser(setUser);
    }, []);

    useEffect(() => {
        // This ensures the modal is only initialized on the client side
        if (typeof window !== 'undefined' && window.bootstrap) {
            const modalElement = document.getElementById('exampleModal');
            const modal = new window.bootstrap.Modal(modalElement);
            modal.show();
        }
    }, []);




    return (
        <div>
            {/* Button trigger modal */}
            <button className={classes.button} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handlePushData}>
                Active
            </button>
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
