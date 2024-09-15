import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, editUser } from './../../core/store/actions';
import { useParams, useNavigate } from 'react-router-dom';
import Styles from './style.module.css'
const UserForm = () => {
  const { id } = useParams();  
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  const user = users.find((user) => user.login.uuid === id);  

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  useEffect(() => {
    if (id && user) {
      setFormData({
        firstName: user.name.first,
        lastName: user.name.last,
        email: user.email,
      });
    }
  }, [id, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    let formErrors = {};
    if (!formData.firstName) formErrors.firstName = 'First Name is required';
    if (!formData.lastName) formErrors.lastName = 'Last Name is required';
    if (!formData.email) formErrors.email = 'Email is required';
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (formData.firstName && formData.lastName && formData.email) {
      if (id) {
        dispatch(editUser(id, {
          name: { first: formData.firstName, last: formData.lastName },
          email: formData.email,
        }));
      } else {
        dispatch(addUser({
          login: { uuid: new Date().getTime() }, 
          name: { first: formData.firstName, last: formData.lastName },
          email: formData.email,
        }));
      }
      navigate('/');  
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className={Styles.form_user}>
      <h2>{id ? 'Edit' : 'Create'} User</h2>
      <form onSubmit={handleSubmit}>
      <div>
        <label for="firstName">First Name</label>
          <input
            type="text" id="firstName" name="firstName" aria-label='firstName'
            value={formData.firstName} onChange={handleChange}
            placeholder="First Name" required
          />
          {errors.firstName && <p>{errors.firstName}</p>}
        </div>
        <div>
          <label for="lastName">last Name</label>
          <input
            type="text" id="lastName" aria-label="Last Name" name="lastName" value={formData.lastName}
            onChange={handleChange} placeholder="Last Name" required
            />
        </div>
        <div>
          <label for="user_email">Email</label>
            <input
              type="email" id="user_email" aria-label="User Email" name="email" value={formData.email} onChange={handleChange}
              placeholder="Email" required
          />
          {errors.email && <p>{errors.email}</p>}

          </div>
        <button type="submit">{id ? 'Edit' : 'Create'} User</button>
      </form>
    </div>
  );
};

export default UserForm;
