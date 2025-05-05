import { defineStore } from 'pinia'

interface WarsawState {
  inputs: {
    carbs: number
    fat: number
    protein: number
    icr: number
    isf: number
    fpuKcal: number
  }
}

export const useWarsawStore = defineStore('warsaw', {
  state: (): WarsawState => ({
    inputs: {
      carbs: 0,
      fat: 0,
      protein: 0,
      icr: 15,
      isf: 15,
      fpuKcal: 100
    }
  }), // Add a comma here to separate getters and actions

  getters: {
    carbInsulin: (state) => state.inputs.carbs / state.inputs.icr,
    fatKcal: (state) => state.inputs.fat * 9,
    proteinKcal: (state) => state.inputs.protein * 4,
    totalKcal(): number {
      return this.fatKcal + this.proteinKcal
    },
    fpu(state): number {
      return this.totalKcal / state.inputs.fpuKcal
    },
    EoinP(): number {
      return this.totalKcal / 10
    },
    EoinPercentInitialDose(): number {
      return this.carbInsulin / 100
    },
    EoinPercent(): number {
      return this.EoinPercentInitialDose * this.EoinP
    },
    fpuInsulin(): number {
      return this.fpu
    },
    totalInsulin(): number {
      return this.carbInsulin + this.fpuInsulin
    }
  },

  actions: {
    updateInput(field: keyof WarsawState['inputs'], value: number) {
      this.inputs[field] = value
    }
  }
})