<script setup lang="ts">
import { useWarsawStore } from '../stores/WarsawStore'
import ErrorBoundary from './ErrorBoundary.vue'

const store = useWarsawStore()

const inputFields = [
  ['carbs', 'Carbohydrates (g)'],
  ['fat', 'Fat (g)'],
  ['protein', 'Protein (g)'],
  ['icr', 'ICR (g/unit)'],
  ['isf', 'ISF (mg/dL/unit)'],
  ['fpuKcal', 'FPU kcal (per unit insulin)']
] as const

const handleInput = (field: string, event: Event) => {
  const value = parseFloat((event.target as HTMLInputElement).value) || 0
  store.updateInput(field as keyof typeof store.inputs, value)
}
</script>

<template>
  <ErrorBoundary>
    <div class="p-6 max-w-xl mx-auto space-y-6">
      <h1 class="text-2xl font-bold">Warsaw Method Insulin Calculator</h1>

      <div v-for="[name, label] in inputFields" :key="name">
        <label class="block font-medium mb-1">{{ label }}</label>
        <input
          type="number"
          :value="store.inputs[name]"
          @input="(e) => handleInput(name, e)"
          class="w-full p-2 border rounded"
        />
      </div>

      <div class="space-y-2">
        <h2 class="text-xl font-semibold">Results</h2>
        <p>Calories from Fat: {{ store.fatKcal.toFixed(1) }} kcal</p>
        <p>Calories from Protein: {{ store.proteinKcal.toFixed(1) }} kcal</p>
        <p>Total Fat + Protein Calories: {{ store.totalKcal.toFixed(1) }} kcal</p>
        <p>Fat-Protein Units (FPUs): {{ store.fpu.toFixed(2) }}</p>
        <p>Insulin for Carbs: {{ store.carbInsulin.toFixed(2) }} units</p>
        <p>Insulin for FPUs: {{ store.fpuInsulin.toFixed(2) }} units</p>
        <p class="font-bold">Total Insulin Dose: {{ store.totalInsulin.toFixed(2) }} units</p>
        <p>EoinP: {{ store.EoinP.toFixed(2) }} totalFPK / 10</p>
        <p>EoinPercentInitialDose: {{ store.EoinPercentInitialDose.toFixed(2) }} carb insulin / 100</p>
        <p>EoinPercent: {{ store.EoinPercent.toFixed(2) }} EoinPercentInitialDose * EoinP</p>
        <p>Second Dose: </p>
      </div>

      <div class="mt-6 border-t pt-4 space-y-2">
        <h2 class="text-lg font-semibold">Bolus Timing Guide</h2>
        <ul class="list-disc list-inside">
          <li><strong>Carb Insulin:</strong> Give before or with meal.</li>
          <li><strong>Fat/Protein Insulin (MDI):</strong> Split dose: 50% with meal, 50% 3 hrs later.</li>
          <li><strong>Fat/Protein Insulin (Pump):</strong> Extended bolus: 20–30% now, 70–80% over 4–5 hrs.</li>
          <li><strong>Monitor:</strong> Watch glucose for 4–6 hours post-meal.</li>
        </ul>
      </div>
    </div>
  </ErrorBoundary>
</template>