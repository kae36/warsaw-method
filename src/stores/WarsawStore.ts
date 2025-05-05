import { defineStore } from 'pinia'
import { z } from 'zod'

const inputSchema = z.object({
  carbs: z.number().min(0).default(43.2),
  fat: z.number().min(0).default(20.2),
  protein: z.number().min(0).default(45.9),
  icr: z.number().positive().default(20),
  isf: z.number().positive().default(10),
  fpuKcal: z.number().positive().default(100)
})

type WarsawInputs = z.infer<typeof inputSchema>

export const useWarsawStore = defineStore('warsaw', {
  state: () => ({
    inputs: inputSchema.parse({
      carbs: 43.2,
      fat: 20.2,
      protein: 45.9,
      icr: 20,
      isf: 10,
      fpuKcal: 100
    })
  }),
  
  getters: {
    fatKcal: (state) => state.inputs.fat * 9,
    proteinKcal: (state) => state.inputs.protein * 4,
    totalKcal: (state) => state.fatKcal + state.proteinKcal,
    fpu: (state) => state.totalKcal / state.inputs.fpuKcal,
    carbInsulin: (state) => state.inputs.carbs / state.inputs.icr,
    EoinP: (state) => state.totalKcal / 10,
    EoinPercentInitialDose: (state) => state.carbInsulin / 100,
    EoinPercent: (state) => state.EoinPercentInitialDose * state.EoinP,
    fpuInsulin: (state) => state.fpu,
    totalInsulin: (state) => state.carbInsulin + state.fpuInsulin
  },

  actions: {
    updateInput(field: keyof WarsawInputs, value: number) {
      try {
        const parsed = inputSchema.shape[field].parse(value)
        this.inputs[field] = parsed
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.error(`Validation error for ${field}:`, error.errors)
        } else {
          console.error(`Unexpected error for ${field}:`, error)
        }
      }
    }
  }
})