import { RForm } from '~shared/ui/form'
import { RInput } from '~shared/ui/input'

import { ILogin } from './types/login'
import { useLoginQuery } from './api/queries'
import { useNavigate } from 'react-router-dom'
import { RouterPaths } from '~shared/constants/router-path'

const LoginForm = () => {
  const navigate = useNavigate()
  const { mutate, isPending } = useLoginQuery(() => navigate(RouterPaths.root))

  const handleSubmit = (data: ILogin) => {
    mutate(data)
  }

  return (
    <RForm
      onSubmit={handleSubmit}
      isLoading={isPending}
      inputs={[
        <RInput
          key='username'
          required
          label='Loginingiz kiriting!'
          name='username'
          placeholder='kiritish shart!'
        />,
        <RInput
          key='password'
          required
          label='Parolingizni kiriting!'
          name='password'
          placeholder='kiritish shart!'
        />
      ]}
      buttonText='Kirish'
    />
  )
}

export default LoginForm