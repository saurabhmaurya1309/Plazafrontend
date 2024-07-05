import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const { fullName, email, password, confirmPassword } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const validatePassword = (password) => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return re.test(password);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else if (!validatePassword(password)) {
            toast.error('Password must be at least 8 characters long, include at least one number, one special character, one uppercase letter, and one lowercase letter');
        } else {
            const newUser = {
                fullName,
                email,
                password,
            };

            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };

                const body = JSON.stringify(newUser);

                const res = await axios.post(
                    'https://plazabackend.onrender.com/api/users/signup',
                    body,
                    config
                );

                toast.success('User registered successfully');
                setFormData({
                    fullName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                });
            } catch (err) {
                if (err.response && err.response.data) {
                    toast.error(err.response.data.msg);
                } else {
                    toast.error('Something went wrong');
                }
            }
        }
    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={onSubmit}>
                <h2>Signup</h2>
                <div>
                    <input
                        type="text"
                        placeholder="Full Name"
                        name="fullName"
                        value={fullName}
                        onChange={onChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="email"
                        placeholder="Email ID"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Create a Password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={onChange}
                        required
                    />
                </div>
                <button type="submit">Signup</button>
                <div className="login-link">
                    <p>Already have an Account? <a href="/login">Login</a></p>
                </div>
            </form>
        </div>
    );
};

export default Signup;
