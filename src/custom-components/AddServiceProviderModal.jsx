import React, { useState } from 'react';

const AddServiceProviderModal = () => {

    const [formData, setFormData] = useState({
        name: '',
        specialization: '',
        phone: '',
        email: '',
        contractType: '',
        availabilityStatus: 'Available',
        notes: '',
    });

    return (
        <></>
    );
};

export default AddServiceProviderModal;