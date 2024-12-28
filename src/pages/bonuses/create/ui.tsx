import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";

import { SalaryInput } from "~features/salary-input";
import PermissionControl from "~features/permission/ui";
import { bonusSchema, useCreateBonusQuery, type ICreateBonus } from "~entities/bonus";
import { useGetWorkersQuery } from "~entities/worker";
import { RForm } from "~shared/ui/form"
import { RIcon } from "~shared/ui/icon"
import { RButton } from "~shared/ui/button"
import { RInput } from "~shared/ui/input";
import { Spinner } from "~shared/ui/spinner";
import { RSelect } from "~shared/ui/select";
import { RouterPaths } from "~shared/constants/router-path";
import { basePermissions } from "~shared/constants/base-permissions";

import s from './styles.module.scss'

const BonusCreatePage = () => {
    const navigate = useNavigate()
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { data: workers, isPending } = useGetWorkersQuery()
    const { mutate } = useCreateBonusQuery()

    const handleSubmit = (data: ICreateBonus) => {
        setErrors({})
        const preparedData: ICreateBonus = {
            ...data,
            amount: Number(data.amount.toString().replace(/\s+/ig, ''))
        }

        const result = bonusSchema.safeParse(preparedData)
        if (result.success) {
            mutate(result.data)
            navigate(RouterPaths.bonuses.root)
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
        <PermissionControl level={basePermissions.bonus.create}>
            <RButton type='button' color='white' className={s.backButton} onClick={() => navigate(-1)}>
                <RIcon name='arrow-back' /> Qaytish
            </RButton>
            <div className={s.wrapper}>
                <h2 className={s.title}>Bonus qo'shish</h2>
                <RForm
                    onSubmit={handleSubmit}
                    inputs={[
                        <RSelect key='1'
                            required
                            label="Xodim"
                            name="worker_id"
                            options={workersOptions}
                            errorMessage={errors["worker_id"]}
                            defaultOptionText="Xodimni Tanlang"
                        />,
                        <RInput key='2'
                            required
                            placeholder="Polni yuvgani uchun!"
                            label="Sabab"
                            name="description"
                            errorMessage={errors["description"]}
                        />,
                        <SalaryInput key='3'
                            required
                            label="Miqdor"
                            name="amount"
                            errorMessage={errors["amount"]}
                        />,
                    ]}
                    buttonText="Qo'shish"
                />
            </div>
        </PermissionControl>
    )
}

export default BonusCreatePage