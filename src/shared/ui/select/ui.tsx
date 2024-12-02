import { HTMLProps, useId } from 'react';
import s from './styles.module.scss';

interface RSelectProps extends HTMLProps<HTMLSelectElement> {
    label?: string;
    errorMessage?: string
    options: { value: string; label: string }[];
    defaultOptionText?: string
}

const RSelect = ({ label, options, errorMessage, defaultOptionText, ...props }: RSelectProps) => {
    const id = useId();
    return (
        <div className={s.wrapper}>
            {label && <label htmlFor={id}>{label}</label>}
            <select id={id} {...props}>
                <option value="">{defaultOptionText}</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {errorMessage && <span>{errorMessage}</span>}
        </div>
    );
};

export default RSelect;