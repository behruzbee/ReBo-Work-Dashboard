import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";

import { PermissionControl } from "~features/permission";
import { historySchema, ICreateHistory, useCreateHistoryQuery } from "~entities/history";
import { useGetWorkersQuery } from "~entities/worker";
import { RForm } from "~shared/ui/form"
import { RIcon } from "~shared/ui/icon"
import { RButton } from "~shared/ui/button"
import { RInput } from "~shared/ui/input";
import { Spinner } from "~shared/ui/spinner";
import { RSelect } from "~shared/ui/select";
import { RouterPaths } from "~shared/constants/router-path";

import s from './styles.module.scss'
import { basePermissions } from "~shared/constants/base-permissions";

const HistoryCreatePage = () => {
    const navigate = useNavigate()
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { data: workers, isPending } = useGetWorkersQuery()
    const { mutate } = useCreateHistoryQuery()

    const handleSubmit = (data: ICreateHistory) => {
        setErrors({})
        const result = historySchema.safeParse(data)

        if (result.success) {
            mutate(result.data)
            navigate(RouterPaths.histories.root)
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

    const historiesOptions = [
        { label: 'Oktyabr-ReBo', value: 'Oktyabr-ReBo' },
        { label: 'Vasmoy-ReBo', value: 'Vasmoy-ReBo' },
        { label: 'Premium-ReBo', value: 'Premium-ReBo' },
        { label: 'Oktyabr-Paynet', value: 'Oktyabr-Paynet' },
        { label: '2-Mikrorayon-Paynet', value: '2-Mikrorayon-Paynet' },
    ]

    const workingStatusOptions = [
        { label: 'Ishga keldi', value: 'enter' },
        { label: 'Ishdan chiqdi', value: 'exit' },
    ]

    return (
        <PermissionControl level={basePermissions.history.create}>
            <RButton type='button' color='white' className={s.backButton} onClick={() => navigate(-1)}>
                <RIcon name='arrow-back' /> Qaytish
            </RButton>
            <div className={s.wrapper}>
                <h2 className={s.title}>Tarix qo'shish</h2>
                <RForm
                    onSubmit={handleSubmit}
                    buttonText="Qo'shish"
                    inputs={[
                        <RSelect
                            key='1'
                            required
                            label="Xodim"
                            name="worker_id"
                            options={workersOptions}
                            errorMessage={errors["worker_id"]}
                            defaultOptionText="Xodimni tanlang"
                        />,
                        <RSelect
                            key='2'
                            required
                            label="Ish joyi"
                            name="work_place_name"
                            options={historiesOptions}
                            errorMessage={errors["work_place_name"]}
                            defaultOptionText="Ish joyini tanlang"
                        />,
                        <RSelect
                            key='3'
                            required
                            label="Ish statusi"
                            name="status_type"
                            options={workingStatusOptions}
                            errorMessage={errors["status_working"]}
                            defaultOptionText="Ish statusini tanlang"
                        />,
                        <RInput
                            key='4'
                            required
                            type="datetime-local"
                            label="Skanerlangan Vaqt"
                            name="scan_time"
                            errorMessage={errors["scan_time"]}
                        />
                    ]}
                />
            </div>
        </PermissionControl>
    )
}

export default HistoryCreatePage