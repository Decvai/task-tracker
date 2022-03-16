import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { statusList, Task } from '../../api/tasks';
import { useAppSelector } from '../../app/hooks';
import ErrorIcon from '../../assets/error.png';
import GoBack from '../../assets/go-back.png';
import { API_URL } from '../../config';
import { getToday } from '../../utils/helpers';
import { LoadingPage } from '../../utils/LoadingPage/LoadingPage';
import {
  newTaskValidate,
  NewTaskValidateValues,
} from '../../utils/validators/newTaskValidator';
import { selectToken } from '../auth/authSlice';
import { Status } from './Status';

type Param = 'dayId';

export const Day = () => {
  const { dayId } = useParams<Param>();

  const token = useAppSelector(selectToken);

  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>([]);
  const columnsNumber = tasks.length ? Object.keys(tasks[0]).length : 6;
  let indexNumber = 0;

  const today = getToday();
  const initialValues: NewTaskValidateValues = {
    name: '',
    hoursFrom: '',
    hoursTo: '',
    dateIntervalFrom: today,
    dateIntervalTo: today,
    notes: '',
  };

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const getTasks = async () => {
      try {
        const tasksFromServer = await fetchTasks();

        if (isMounted) {
          setTasks([...tasksFromServer]);
          setIsLoading(false);
        }
      } catch (err) {
        if (err instanceof Error) {
          alert(JSON.stringify(err.message));
        }

        alert(JSON.stringify(err, null, 2));

        navigate('/days');
      }
    };
    getTasks();

    return () => {
      isMounted = false;
    };
  }, []);
  const fetchTasks = async () => {
    const res = await fetch(`${API_URL}/api/tasks?day=${dayId}`, {
      headers: {
        Authorization: `Bearer: ${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw error;
    }

    const tasksFromServer = await res.json();
    return tasksFromServer;
  };

  const deleteTask = async (id: string) => {
    try {
      const deletedTask: Task = await deleteFetch(id);

      setTasks((prev) => prev.filter((task) => task._id !== deletedTask._id));
    } catch (err) {
      alert(JSON.stringify(err, null, 2));
    }
  };
  const deleteFetch = async (id: string) => {
    const response = await fetch(`${API_URL}/api/tasks?id=${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer: ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw result;
    }

    return result;
  };

  const addNewTask = async (
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

    try {
      const serverNewTask: Task = await postFetch(newTask);

      setTasks((prev) => [...prev, serverNewTask]);
      resetForm();
    } catch (err) {
      alert(JSON.stringify(err, null, 2));
    }
  };
  const postFetch = async (task: Task) => {
    const response = await fetch(`${API_URL}/api/tasks?day=${dayId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer: ${token}`,
      },
      body: JSON.stringify({ task }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw result;
    }

    return result;
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className='day'>
      <div className='day__header'>
        <div className='day__go-back'>
          <Link to='/'>
            <img src={GoBack} alt='' />
            Back to calendar
          </Link>
        </div>

        <div className='day__selected-day'>{dayId}</div>
      </div>

      <div className='day__body'>
        <table>
          <tbody>
            <tr>
              <th>№</th>
              <th>Task name</th>
              <th>Status</th>
              <th>Expected time</th>
              <th>Notes</th>
            </tr>

            {tasks.map((task) => (
              <tr key={task._id}>
                <td className='day__index-column'>
                  <div
                    className='day__remove-task'
                    onClick={() => deleteTask(task._id!)}
                  >
                    <span>X</span>
                  </div>
                  <div className='day__index'>{++indexNumber}</div>
                </td>
                <td>{task.name}</td>
                <Status task={task} statusList={statusList} />
                <td>{`${task.hours.from} - ${task.hours.to}`}</td>
                <td>
                  <textarea
                    className='day__note'
                    defaultValue={task.notes}
                  ></textarea>
                </td>
              </tr>
            ))}

            <tr>
              <td className='day__add-task' colSpan={columnsNumber}>
                <div className='day__remove-task fake'></div>
                <Formik
                  initialValues={initialValues}
                  onSubmit={addNewTask}
                  validate={newTaskValidate}
                >
                  {({ values: { name }, errors, isValid }) => (
                    <Form>
                      <Field
                        className='day__add-task-name'
                        name='name'
                        type='text'
                        placeholder='+ Add'
                      />
                      {name && errors.name && (
                        <div className='day__add-task-error'>
                          <img src={ErrorIcon} alt='ErrorIcon' />
                          <span>{errors.name}</span>
                        </div>
                      )}
                      <div className='day__add-task-hours'>
                        <Field
                          className={
                            name
                              ? 'day__add-task-hours-from show'
                              : 'day__add-task-hours-from'
                          }
                          name='hoursFrom'
                          type='time'
                          disabled={!name}
                        />
                        <span
                          className={
                            name
                              ? 'day__add-task-separator show'
                              : 'day__add-task-separator'
                          }
                        >
                          —
                        </span>
                        <Field
                          className={
                            name
                              ? 'day__add-task-hours-to show'
                              : 'day__add-task-hours-to'
                          }
                          name='hoursTo'
                          type='time'
                          disabled={!name}
                        />
                        {name && (
                          <ErrorMessage name='hoursFrom'>
                            {(msg) => (
                              <div className='day__add-task-error'>
                                <img src={ErrorIcon} alt='ErrorIcon' />
                                {msg}
                              </div>
                            )}
                          </ErrorMessage>
                        )}
                      </div>

                      <input
                        className={
                          name
                            ? 'day__add-task-confirm show'
                            : 'day__add-task-confirm'
                        }
                        type='submit'
                        value='Add'
                        disabled={!isValid}
                      />
                    </Form>
                  )}
                </Formik>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
