import { HTMLProps, useId } from 'react';
import s from './styles.module.scss';

interface RSelectProps extends HTMLProps<HTMLSelectElement> {
    label?: string;
    options: { value: string; label: string }[];
}

const RSelect = ({ label = "Ishchini qidiring", options, ...props }: RSelectProps) => {
    const id = useId();
    return (
        <div className={s.wrapper}>
            {label && <label htmlFor={id}>{label}</label>}
            <select id={id} {...props}>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default RSelect;