import { FC } from 'react';
import classes from './Timer.module.css';

interface TimerProps {
  timer: number;
}

export const Timer: FC<TimerProps> = ({ timer }) => {
  return (
    <div className={classes.timer}>
      автообновление через {timer}
    </div>
  );
};