import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";

import { penaltySchema, type IPenalty, useCreatePenaltyQuery } from "~entities/penalty";
import { useGetWorkersQuery } from "~entities/worker";
import { RForm } from "~shared/ui/form"
import { RIcon } from "~shared/ui/icon"
import { RButton } from "~shared/ui/button"
import { RInput } from "~shared/ui/input";
import { Spinner } from "~shared/ui/spinner";
import { RSelect } from "~shared/ui/select";
import { RouterPaths } from "~shared/constants/router-path";

import s from './styles.module.scss'
import { SalaryInput } from "~features/salary-input";

const PenaltyCreatePage = () => {
    const navigate = useNavigate()
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { data: workers, isPending } = useGetWorkersQuery()
    const { mutate } = useCreatePenaltyQuery()

    const handleSubmit = (data: any) => {
        setErrors({})
        const preparedData: IPenalty = {
            ...data,
            amount: Number(data.amount.replace(/\D/g, ''))
        }

        const result = penaltySchema.safeParse(preparedData)
        if (result.success) {
            mutate(result.data)
            navigate(RouterPaths.penalties.root)
        } else {
            const fieldErrors: Record<string, string> = {};
            result.error.errors.forEach((err) => {
                if (err.path[0]) {
                    fieldErrors[err.path[0]] = err.message;
                }
            });
            setErrors(fieldErrors);
            toast.error('Данные не валидны!')
        }
    }

    if (isPending || !workers) {
        return <Spinner />
    }

    const workersOptions = workers.map(worker => ({ label: `${worker.name} ${worker.lastName}`, value: worker.id }))

    return (
        <>
            <RButton type='button' color='white' className={s.backButton} onClick={() => navigate(-1)}>
                <RIcon name='arrow-back' /> Qaytish
            </RButton>
            <div className={s.wrapper}>
                <h2 className={s.title}>Jarima qo'shish</h2>
                <RForm
                    onSubmit={handleSubmit}
                    inputs={[
                        <RSelect key='1' required label="Ishchi" name="worker_id" options={workersOptions} />,
                        <RInput key='2' required placeholder="Kech qolgani uchun!" label="Sabab" name="description" errorMessage={errors["description"]} />,
                        <SalaryInput key='3' required label="Miqdor" name="amount" errorMessage={errors["amount"]} />,
                    ]}
                    buttonText="Qo'shish"
                />
            </div>
        </>
    )
}

export default PenaltyCreatePage