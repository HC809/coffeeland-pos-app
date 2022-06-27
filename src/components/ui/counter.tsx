import cn from 'classnames';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

type ButtonEvent = (
  e: React.MouseEvent<HTMLButtonElement | MouseEvent>
) => void;

type CounterProps = {
  value: number;
  onDecrement: ButtonEvent;
  onIncrement: ButtonEvent;
  className?: string;
  disabled?: boolean;
};

const variantClasses = {
  pillVertical:
    'flex-col-reverse items-center w-8 h-24 bg-gray-100 text-heading rounded-full',
};

const Counter: React.FC<CounterProps> = ({
  value,
  onDecrement,
  onIncrement,
  className,
  disabled,
}) => {
  return (
    <div
      className={cn(
        'flex overflow-hidden',
        variantClasses['pillVertical'],
        className
      )}
    >
      <button
        onClick={onDecrement}
        className={cn(
          'hover:bg-accent-hover cursor-pointer p-2 transition-colors duration-200 hover:!bg-gray-100 focus:outline-none'
        )}
      >
        <span className="sr-only">-</span>
        <AiOutlineMinus className="md:h-4.5 md:w-4.5 h-3.5 w-3.5 stroke-2" />
      </button>
      <div
        className={cn(
          'flex flex-1 items-center justify-center text-sm font-semibold',
          'pillVertical'
        )}
      >
        {value}
      </div>
      <button
        onClick={onIncrement}
        disabled={disabled}
        className={cn(
          'hover:bg-accent-hover cursor-pointer p-2 transition-colors duration-200 hover:!bg-gray-100 focus:outline-none'
        )}
        title={disabled ? 'Sold out' : ''}
      >
        <span className="sr-only">{'+'}</span>
        <AiOutlinePlus className="md:h-4.5 md:w-4.5 h-3.5 w-3.5 stroke-2" />
      </button>
    </div>
  );
};

export default Counter;
