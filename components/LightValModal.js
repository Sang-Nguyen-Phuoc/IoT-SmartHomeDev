import React, { useState } from 'react';
import { updateLogs } from '@/Utils/UpdateLogs';
import classes from '../styles/Settings.module.css';

const LightValModal = () => {
    const [lightValue, setLightValue] = useState('');

    const handleInputChange = (e) => {
        setLightValue(e.target.value);
    };

    const handleAdjust = async () => {
        if (lightValue) {
            await updateLogs('Settings', 'light', parseInt(lightValue, 10));
            setLightValue('');
        }
    };

    return (
        <div>
            <button
                className={classes.button}
                data-bs-toggle="modal"
                data-bs-target="#lightValModal"
            >
                Adjust light value
            </button>

            <div className="modal fade" id="lightValModal" tabIndex={-1} aria-labelledby="lightValModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="lightValModalLabel">Adjust light value</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <label htmlFor="lightValueInput" className={classes.label}>New Light Value:</label>
                            <input
                                type="number"
                                id="lightValueInput"
                                className="form-control"
                                value={lightValue}
                                onChange={handleInputChange}
                                placeholder="Enter value"
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-success" onClick={handleAdjust} data-bs-dismiss="modal">Adjust</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LightValModal;
