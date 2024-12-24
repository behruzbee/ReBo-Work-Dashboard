import z from 'zod'

export const userSchema = z.object({
  username: z
    .string({ required_error: 'Loginni kiriting!' })
    .min(5, "Kamida 5ta harf bo'lishi shart")
    .max(70, "Ko'pida 70ta harf bo'lishi shart"),
  password: z
    .string({ required_error: 'Parolni kiriting!' })
    .min(5, "Kamida 5ta harf bo'lishi shart")
    .max(70, "Ko'pida 70ta harf bo'lishi shart"),
  status_index: z
    .number({ required_error: 'Foydalanuvchi statusini kiriting!' })
    .min(0, "Xodim statusi minimum 0 bo'lishi shart")
    .max(3, "Xodim statusi minimum 3 bo'lishi shart")
})
