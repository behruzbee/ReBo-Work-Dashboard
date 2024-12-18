import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { PermissionControl } from "~features/permission";
import { type ICreateUser, useGetUserQuery, useUpdateUserQuery, userSchema } from "~entities/user";
import { RouterPaths } from "~shared/constants/router-path";
import { RButton } from "~shared/ui/button";
import { RIcon } from "~shared/ui/icon";
import { RForm } from "~shared/ui/form";
import { RInput } from "~shared/ui/input";
import { Spinner } from "~shared/ui/spinner";
import { RSelect } from "~shared/ui/select";
import { basePermissions, permissionStatus } from "~shared/constants/base-permissions";

import s from './styles.module.scss'

const AccountUpdatePage = () => {
    const navigate = useNavigate()
    const { username } = useParams<{ username: string }>()
    const { data: user } = useGetUserQuery(username || '')
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { mutate } = useUpdateUserQuery()

    const handleSubmit = (data: ICreateUser) => {
        setErrors({})
        const preparedData: ICreateUser = {
            ...data,
            status_index: Number(data.status_index)
        }
        const result = userSchema.safeParse(preparedData)
        if (result.success) {
            mutate(result.data)
            navigate(RouterPaths.accounts.root)
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

    if (!user) {
        return (
            <div className={s.wrapper}>
                <Spinner />
            </div>
        )
    }

    const statusOptions = permissionStatus.map((status, idx) => ({ value: String(idx), label: status }))

    return (
        <PermissionControl level={basePermissions.worker.create}>
            <RButton type='button' color='white' className={s.backButton} onClick={() => navigate(-1)}>
                <RIcon name='arrow-back' /> Qaytish
            </RButton>
            <div className={s.wrapper}>
                <h2 className={s.title}>Akkaunt qo'shish</h2>
                <RForm
                    onSubmit={handleSubmit}
                    inputs={[
                        <RInput
                            key='1'
                            required
                            readOnly
                            value={user.username}
                            type="text"
                            label="Login"
                            name="username"
                            errorMessage={errors['username']}
                        />,
                        <RInput
                            key='2'
                            required
                            placeholder="Parol o'ylab toping!"
                            type="text"
                            label="Parol"
                            name="password"
                            errorMessage={errors['password']}
                        />,
                        <RSelect
                            key='3'
                            type="text"
                            label="Lavozim"
                            name="status_index"
                            errorMessage={errors["status_index"]}
                            options={statusOptions}
                            defaultOptionText="Statusni tanglang"
                            required
                        />,
                    ]}
                    buttonText="Qo'shish"
                />
            </div>
        </PermissionControl>
    )
}

export default AccountUpdatePage