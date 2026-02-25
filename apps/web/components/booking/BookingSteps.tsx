'use client';
import { Check } from 'lucide-react';

interface Step {
  id: number;
  label: string;
}

interface Props {
  steps: Step[];
  currentStep: number;
}

export default function BookingSteps({ steps, currentStep }: Props) {
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, i) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm border-2 transition-colors ${
              step.id < currentStep ? 'bg-orange-500 border-orange-500 text-white' :
              step.id === currentStep ? 'border-orange-500 text-orange-500' :
              'border-gray-300 text-gray-400'
            }`}>
              {step.id < currentStep ? <Check className="h-4 w-4" /> : step.id}
            </div>
            <span className={`text-xs mt-1 font-medium ${step.id === currentStep ? 'text-orange-500' : step.id < currentStep ? 'text-gray-600' : 'text-gray-400'}`}>
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`h-0.5 w-16 md:w-24 mx-2 mb-4 ${step.id < currentStep ? 'bg-orange-500' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  );
}
