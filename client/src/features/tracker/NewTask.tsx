import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { Dispatch, FC, SetStateAction } from 'react';
import { statusList, Task } from '../../api/tasks';
import { getToday } from '../../utils/helpers';
import {
  newTaskValidate,
  NewTaskValidateValues,
} from '../../utils/validators/newTaskValidator';

interface NewTaskProps {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
}

export const NewTask: FC<NewTaskProps> = ({ active, setActive }) => {
  const today = getToday();

  const initialValues: NewTaskValidateValues = {
    name: '',
    hoursFrom: '',
    hoursTo: '',
    dateIntervalFrom: today,
    dateIntervalTo: today,
    notes: '',
  };

  const submitHandler = async (
    {
      name,
      hoursFrom,
      hoursTo,
      dateIntervalFrom,
      dateIntervalTo,
      notes,
    }: NewTaskValidateValues,
    { resetForm }: FormikHelpers<NewTaskValidateValues>
  ) => {
    const newTask: Task = {
      name,
      hours: {
        from: hoursFrom,
        to: hoursTo,
      },
      dateInterval: {
        from: dateIntervalFrom,
        to: dateIntervalTo,
      },
      notes,
      status: statusList.blank,
    };

    //TODO send to server

    try {
      await postFetch(newTask);
    } catch (err) {
      alert(JSON.stringify(err, null, 2));
    }

    resetForm();
    setActive(false);
  };
  const postFetch = async (task: Task) => {
    // const res = await fetch(`${API_URL}/api/tasks?day=${id}`, {
    // 	method: 'POST',
    // 	headers: {
    // 		Accept: 'application/json',
    // 		'Content-Type': 'application/json',
    // 		Authorization: `Bearer: ${localStorage.getItem('token')}`,
    // 	},
    // 	body: JSON.stringify({ task }),
    // });
    // if (!res.ok) {
    // 	const error = await res.json();
    // 	throw error;
    // }
  };

  return (
    <div
      className={active ? 'new-task active' : 'new-task'}
      onClick={() => setActive(false)}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={submitHandler}
        validate={newTaskValidate}
      >
        {({ isSubmitting, values, errors, touched }) => (
          <Form
            className={
              active ? 'new-task__content active' : 'new-task__content'
            }
            onClick={(e) => e.stopPropagation()}
          >
            <div className='new-task__input-wrapper'>
              <label htmlFor='name'>Name: </label>
              <Field
                id='name'
                className={
                  errors.name && touched.name
                    ? 'new-task__name error'
                    : 'new-task__name'
                }
                name='name'
                type='text'
              />
              <ErrorMessage className='error' component='div' name='name' />
            </div>

            <div className='new-task__input-wrapper'>
              <label htmlFor={values.hoursFrom ? 'hoursTo' : 'hoursFrom'}>
                Expected time:{' '}
              </label>
              <div>
                <Field
                  id='hoursFrom'
                  className={
                    errors.hoursFrom && (touched.hoursFrom || touched.hoursTo)
                      ? 'new-task__time error'
                      : 'new-task__time'
                  }
                  name='hoursFrom'
                  type='time'
                />
                <span className='new-task__separator'>—</span>
                <Field
                  id='hoursTo'
                  className={
                    errors.hoursTo && (touched.hoursFrom || touched.hoursTo)
                      ? 'new-task__time error'
                      : 'new-task__time'
                  }
                  name='hoursTo'
                  type='time'
                />
                <ErrorMessage
                  className='error'
                  component='div'
                  name='hoursFrom'
                />
                {!errors.hoursFrom && (
                  <ErrorMessage
                    className='error'
                    component='div'
                    name='hoursTo'
                  />
                )}
              </div>
            </div>

            <div className='new-task__input-wrapper'>
              <label
                htmlFor={
                  values.hoursFrom ? 'dateIntervalTo' : 'dateIntervalFrom'
                }
              >
                Date interval:{' '}
              </label>
              <div>
                <Field
                  id='dateIntervalFrom'
                  className={
                    errors.dateIntervalFrom && touched.dateIntervalFrom
                      ? 'new-task__time error'
                      : 'new-task__time'
                  }
                  name='dateIntervalFrom'
                  type='date'
                  min={today}
                />
                <span className='new-task__separator'>—</span>
                <Field
                  id='dateIntervalTo'
                  className={
                    errors.dateIntervalTo && touched.dateIntervalTo
                      ? 'new-task__time error'
                      : 'new-task__time'
                  }
                  name='dateIntervalTo'
                  type='date'
                  min={today}
                />
                <ErrorMessage
                  className='error'
                  component='div'
                  name={
                    errors.dateIntervalTo
                      ? 'dateIntervalTo'
                      : 'dateIntervalFrom'
                  }
                />
              </div>
            </div>

            <div className='new-task__input-wrapper'>
              <label htmlFor='notes'>Notes:</label>
              <Field
                id='notes'
                className='new-task__notes'
                name='notes'
                as='textarea'
                rows={10}
                cols={70}
                maxLength={3000}
              ></Field>
            </div>

            <div className='confirm-btn new-task__confirm'>
              <input
                className={isSubmitting ? 'submit loading' : 'submit'}
                type='submit'
                value='Submit'
                disabled={isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
