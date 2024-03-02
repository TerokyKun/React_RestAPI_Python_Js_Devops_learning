import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import classes from './Login.module.scss';
import Button from '../components/UI/Buttons/Button';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth, selectIsAuth, selectToken } from '../redux/slises/auth';

const Login = () => {

const token = useSelector(selectToken);

// Устанавливаем куку с токеном
document.cookie = `access_token=${token}; path=/; expires=${new Date(Date.now() + 86400e3).toUTCString()}`;


  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const [serverError, setServerError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    try {
      const response = await dispatch(fetchAuth(values));
      if (response.payload.error) {
        setServerError('Неверная почта или пароль');
      } 
      if (response.payload.admin) {
        console.log('Привет, админ'); // Вывод сообщения в консоль для админа
      }
    } catch (error) {
      console.error('Error:', error);
      setServerError('Неверная почта или пароль');
    }
  };

  const handleInputChange = () => {
    setServerError('');
  };
if( isAuth) {
  return <Navigate to="/"/>;
}

  return (
    <>
      <div className={classes.container}>
        <div className={classes.formContainer}>
          <span className={classes.nameProject}>TerokyArt.Ai</span>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <span className={classes.loginTitle}>Login account</span>
            {serverError && <p className={classes.error}>{serverError}</p>}
            <label className={classes.label}>Email:</label>
            <div>
              <input
                type="email"
                {...register('email', {
                  required: 'Укажите почту',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Неправильный формат почты',
                  },
                })}
                className={classes.input}
                onChange={handleInputChange}
                required
                placeholder="name@host.com"
              />
              {errors.email && <p className={classes.error}>{errors.email.message}</p>}
            </div>
            <label className={classes.label}>Password:</label>
            <div>
              <input
                type="password"
                {...register('password', {
                  required: 'Укажите пароль',
                 
                })}
                className={classes.input}
                onChange={handleInputChange}
                required
                placeholder="Password"
              />
            </div>
            <div className={classes.btnContainer}>
              <Link to="/signup" className={classes.createAccountLink}>
                Create Account
              </Link>
              <Button type="submit">Next</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
