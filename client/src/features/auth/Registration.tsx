import { ErrorMessage, Field, Form, Formik } from 'formik';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { registrationValidationSchema } from '../../utils/validators/authValidator';
import ErrorIcon from '../../assets/error.png';
import { getErrorMessage } from '../../utils/helpers';
import { login, registration } from './authSlice';

export interface RegistrationData {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

export const Registration: FC = () => {
  const dispatch = useAppDispatch();
  const [registrationError, setRegistrationError] = useState<string>('');

  const initialValues: RegistrationData = {
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  };

  const submitHandler = async ({
    email,
    nickname,
    password,
  }: RegistrationData) => {
    try {
      await dispatch(registration({ email, nickname, password })).then(
        () =>
          dispatch(
            login({
              email,
              password,
            })
          )
      );
    } catch (err) {
      setRegistrationError(getErrorMessage(err));
    }
  };

  return (
    <div className='flex-wrap'>
      <div className='authorization'>
        <div className='authorization__header'>Sign up</div>

        <Formik
          initialValues={initialValues}
          onSubmit={submitHandler}
          validationSchema={registrationValidationSchema}
        >
          {({ isSubmitting }) => (
            <Form className='authorization__form'>
              <span className='authorization__span'></span>
              <Field
                id='email'
                className='authorization__input'
                name='email'
                type='text'
                placeholder='Email'
              />
              <ErrorMessage className='error' component='div' name='email' />

              <span className='authorization__span'></span>
              <Field
                id='nickname'
                className='authorization__input'
                name='nickname'
                type='text'
                placeholder='Nickname'
              />
              <ErrorMessage className='error' component='div' name='nickname' />

              <span className='authorization__span'></span>
              <Field
                id='password'
                className='authorization__input'
                name='password'
                type='password'
                placeholder='Password'
              />
              <ErrorMessage className='error' component='div' name='password' />
              <span className='authorization__span'></span>
              <Field
                id='confirmPassword'
                className='authorization__input'
                name='confirmPassword'
                type='password'
                placeholder='Confirm password'
              />
              <ErrorMessage
                className='error'
                component='div'
                name='confirmPassword'
              />

              <div className='confirm-btn authorization__confirm'>
                <input
                  className={isSubmitting ? 'submit loading' : 'submit'}
                  type='submit'
                  value='Continue'
                  disabled={isSubmitting}
                />
              </div>
            </Form>
          )}
        </Formik>

        {registrationError && (
          <div className='log-error'>
            <img src={ErrorIcon} alt='ErrorIcon' />
            {registrationError}
          </div>
        )}

        <Link to='/' className='authorization__login'>
          Already have an account? Log in
        </Link>
      </div>
    </div>
  );
};
