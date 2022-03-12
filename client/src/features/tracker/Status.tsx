import { FC, FocusEvent, MouseEvent, useRef, useState } from 'react';
import { StatusProps } from '../../api/tasks';

export const Status: FC<StatusProps> = ({ task, statusList }) => {
  const [currentStatus, setCurrentStatus] = useState(task.status);
  const statusElement = useRef<HTMLTableDataCellElement>(null);

  const showStatusList = (event: MouseEvent<HTMLDivElement>) => {
    const currentStatusEl = event.currentTarget;
    currentStatusEl.classList.add('show');
  };

  const statusListBlurHandler = (event: FocusEvent<HTMLDivElement>) => {
    const currentStatusEl = event.currentTarget;
    currentStatusEl.classList.remove('show');
  };

  const changeStatus = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const newStatusEl = event.currentTarget;
    const newStatusId = newStatusEl.dataset.statusId;
    const newCurrentStatus = Object.values(statusList).find(
      (status) => status.id === newStatusId
    );

    if (newCurrentStatus) {
      setCurrentStatus(newCurrentStatus);

      statusElement.current?.blur();
    }
  };

  return (
    <td
      className='day__status'
      ref={statusElement}
      onClick={showStatusList}
      tabIndex={0}
      onBlur={statusListBlurHandler}
      style={{
        backgroundColor: currentStatus.color,
      }}
    >
      <div className='day__current-status'>{currentStatus.text}</div>

      <div className='day__status-list'>
        {Object.values(statusList)
          .filter((status) => status.text !== currentStatus.text)
          .map((status) => (
            <div
              key={status.id}
              onClick={changeStatus}
              style={{
                backgroundColor: status.color,
              }}
              data-status-id={status.id}
            >
              {status.text}
            </div>
          ))}
      </div>
    </td>
  );
};
