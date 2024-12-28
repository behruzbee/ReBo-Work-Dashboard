import z from 'zod'

export const bonusSchema = z.object({
  worker_id: z.string({ required_error: 'Xodimni tanlang!' }),
  description: z.string({ required_error: 'Sababni kiritish shart!' }),
  amount: z.number({
    required_error: 'Miqdorni kiritish shart',
    invalid_type_error: "Son bo'lishi kerak!"
  }).min(5000, "Summa 5.000 so'mdan ko'p bo'ilishi shart")
})
