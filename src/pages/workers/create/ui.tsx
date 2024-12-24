import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { customAlphabet } from 'nanoid';

import { QrCodeGeneratorWithDownload } from "~features/qr-code-generator"
import { SalaryInput } from "~features/salary-input";
import PermissionControl from "~features/permission/ui";
import { IWorker, useCreateWorkerQuery, workerSchema } from "~entities/worker";
import { RForm } from "~shared/ui/form"
import { RIcon } from "~shared/ui/icon"
import { RButton } from "~shared/ui/button"
import { RInput } from "~shared/ui/input";
import { RouterPaths } from "~shared/constants/router-path";
import { basePermissions } from "~shared/constants/base-permissions";

import s from './styles.module.scss'

const generateNumericId = customAlphabet("0123456789", 15);

const WorkerCreatePage = () => {
    const id = generateNumericId(10)
    const navigate = useNavigate()
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { mutate } = useCreateWorkerQuery()

    const handleSubmit = (data: IWorker) => {
        setErrors({})
        const preparedData: IWorker = {
            ...data,
            id,
            age: Number(data.age),
            monthly_salary: Number(data.monthly_salary.toString().replace(/\s+/ig, '')),
            monthly_worked_minutes: 0,
            status_working: 'not_working',
        }

        const result = workerSchema.safeParse(preparedData)
        if (result.success) {
            mutate(result.data)
            navigate(RouterPaths.workers.root)
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

    return (
        <PermissionControl level={basePermissions.worker.create}>
            <RButton type='button' color='white' className={s.backButton} onClick={() => navigate(-1)}>
                <RIcon name='arrow-back' /> Qaytish
            </RButton>
            <div className={s.wrapper}>
                <h2 className={s.title}>Xodim qo'shish</h2>
                <RForm
                    onSubmit={handleSubmit}
                    inputs={[
                        <RInput key='1' required placeholder="Ism kiriting!" type="text" label="Ism" name="name" errorMessage={errors['name']} />,
                        <RInput key='2' required placeholder="Familya kiriting!" type="text" label="Familya" name="lastName" errorMessage={errors['lastName']} />,
                        <RInput key='3' required placeholder="Lavozim kiriting!" type="text" label="Lavozim" name="position" errorMessage={errors["position"]} />,
                        <SalaryInput key='4' required name="monthly_salary" errorMessage={errors["monthly_salary"]} />,
                        <RInput key='5' required placeholder="Yosh kiriting!" type="number" label="Yosh" name="age" min={0} errorMessage={errors["age"]} />,
                        <RInput key='6' required placeholder="Ish soatini kiriting!" type="number" label="Ish soat" name="hours_to_work" min={0} errorMessage={errors["hours_to_work"]} />,
                        <QrCodeGeneratorWithDownload workerId={id} required name="qr_code_text" key='qr-code-generator' errorMessage={errors["qr_code_text"]} />
                    ]}
                    buttonText="Qo'shish"
                />
            </div>
        </PermissionControl>
    )
}

export default WorkerCreatePage