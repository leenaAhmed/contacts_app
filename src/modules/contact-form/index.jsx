import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser, editUser } from '../../core/store/actions';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.css'

const UserForm = () => {
  const [formData, setFormData] = useState({ id: '', name: '', email: '' });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isEditing = false;
    
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = 'Name is required';
    if (!formData.email) formErrors.email = 'Email is required';
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      if (isEditing) {
        dispatch(editUser(formData));
      } else {
        dispatch(addUser({ ...formData, id: new Date().getTime() }));
      }
      navigate('/');
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form_user}>
      <div>
        <label for="user_name">Name</label>
        <input type="text" id="user_name" name="name" placeholder="Lina Ahmed" value={formData.name} onChange={handleChange} />
        {errors.name && <p>{errors.name}</p>}
      </div>
      <div>
        <label for="user_email">Email</label>
        <input type="email" id="user_email" name="email" placeholder="ex: leena@gmail.com" value={formData.email} onChange={handleChange} />
        {errors.email && <p>{errors.email}</p>}
      </div>
      <button type="submit">{isEditing ? 'Edit' : 'Create'} User</button>
    </form>
  );
};

export default UserForm;
