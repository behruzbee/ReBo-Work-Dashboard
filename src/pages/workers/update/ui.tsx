import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { type IWorker, useUpdateWorkerQuery, useGetWorkerQuery, workerSchema } from "~entities/worker";
import { SalaryInput } from "~features/salary-input";
import { PermissionControl } from "~features/permission";
import { QrCodeGeneratorWithDownload } from "~features/qr-code-generator";
import { RouterPaths } from "~shared/constants/router-path";
import { RButton } from "~shared/ui/button";
import { RIcon } from "~shared/ui/icon";
import { RForm } from "~shared/ui/form";
import { RInput } from "~shared/ui/input";
import { Spinner } from "~shared/ui/spinner";
import { basePermissions } from "~shared/constants/base-permissions";

import s from './styles.module.scss'

const UpdateWorkerPage = () => {
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()
    const { data: worker } = useGetWorkerQuery(id || '')

    const [errors, setErrors] = useState<Record<string, string>>({});
    const { mutate } = useUpdateWorkerQuery()

    const handleSubmit = (data: IWorker) => {
        setErrors({})
        const preparedData: IWorker = {
            ...worker,
            ...data,
            age: Number(data.age),
            monthly_salary: Number(data.monthly_salary.toString().replace(/\s+/ig, '')),
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

    if (!worker) {
        return <Spinner />
    }

    return (
        <PermissionControl level={basePermissions.worker.update}>
            <RButton type='button' color='white' className={s.backButton} onClick={() => navigate(-1)}>
                <RIcon name='arrow-back' /> Qaytish
            </RButton>
            <div className={s.wrapper}>
                <h2 className={s.title}>Ishchini o'zgartirish</h2>
                <RForm
                    onSubmit={handleSubmit}
                    inputs={[
                        <RInput key='1' defaultValue={worker.name} required placeholder="Ism kiriting!" type="text" label="Ism" name="name" errorMessage={errors['name']} />,
                        <RInput key='2' defaultValue={worker.lastName} required placeholder="Familya kiriting!" type="text" label="Familya" name="lastName" errorMessage={errors['lastName']} />,
                        <RInput key='3' defaultValue={worker.position} required placeholder="Lavozim kiriting!" type="text" label="Lavozim" name="position" errorMessage={errors["position"]} />,
                        <SalaryInput key='4' defaultValue={worker.monthly_salary} required name="monthly_salary" errorMessage={errors["monthly_salary"]} />,
                        <RInput key='5' defaultValue={worker.age} required placeholder="Yosh kiriting!" type="number" label="Yosh" name="age" min={0} errorMessage={errors["age"]} />,
                        <RInput key='6' defaultValue={worker.hours_to_work} required placeholder="Ish soatini kiriting!" type="number" label="Ish soat" name="hours_to_work" min={0} errorMessage={errors["hours_to_work"]} />,
                        <QrCodeGeneratorWithDownload workerId={worker.id} defaultValue={worker.qr_code_text} required name="qr_code_text" key='qr-code-generator' errorMessage={errors["qr_code_text"]} />
                    ]}
                    buttonText="O'zgartirish"
                />
            </div>
        </PermissionControl>
    )
}

export default UpdateWorkerPage