import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import classes from "./Signup.module.scss"; // Импорт стилей
import Button from "../components/UI/Buttons/Button";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegistr, selectIsAuth } from '../redux/slises/auth';

const Signup = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      nickName: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setServerError("Passwords do not match");
    } else {
      try {
        const response = await dispatch(fetchRegistr(data));
        if (!response.payload) {
          setServerError('Не удалось зарегистрироваться');
        } else if ('token' in response.payload) {
          document.cookie = `access_token=${response.payload.token}; path=/; expires=${new Date(Date.now() + 86400e3).toUTCString()}`;
        }
      } catch (error) {
        console.error('Error:', error);
        setServerError('Не удалось зарегистрироваться');
      }
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

          <span className={classes.nameProject}>Art.Ai</span>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <span className={classes.loginTitle}>Login account</span>
            {serverError && <p className={classes.error}>{serverError}</p>}

            <label className={classes.label}>Nickname:</label>
            <div>
              <input
                type="string"
                {...register('nickName', {
                  required: 'Укажите никнейм',
                })}
                className={classes.input}
                onChange={handleInputChange}
                required
                placeholder="User"
              />
              {errors.nickName && <p className={classes.error}>{errors.nickName.message}</p>}
            </div>

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
            <label className={classes.label}>Confirm Password:</label>
            <div>
              <input
                type="password"
                {...register('confirmPassword', {
                  required: 'Подтвердите пароль',
                })}
                className={classes.input}
                onChange={handleInputChange}
                required
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && <p className={classes.error}>{errors.confirmPassword.message}</p>}
            </div>

            <div className={classes.btnContainer}>
              <Link to="/auth/login" className={classes.createAccountLink}>
                Login
              </Link>
              <Button type="submit" disabled={serverError || watch().password !== watch().confirmPassword}>Next</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;