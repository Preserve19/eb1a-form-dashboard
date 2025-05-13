
import { useForm } from '@/contexts/FormContext';

const FormStepper = () => {
  const { currentStep, setCurrentStep } = useForm();
  
  const steps = [
    { id: 0, name: 'Instructions' },
    { id: 1, name: 'Prizes & Awards' },
    { id: 2, name: 'Memberships' },
    { id: 3, name: 'Published Material' },
    { id: 4, name: "Judge of Others' Work" },
    { id: 5, name: 'Original Contributions' },
    { id: 6, name: 'Scholarly Articles' },
    { id: 7, name: 'Exhibitions' },
    { id: 8, name: 'Leading Role' },
    { id: 9, name: 'High Salary' },
    { id: 10, name: 'Commercial Success' },
    { id: 11, name: 'Review & Submit' },
  ];
  
  return (
    <nav aria-label="Progress" className="hidden md:block">
      <ol className="space-y-2">
        {steps.map((step) => (
          <li key={step.id}>
            <button
              onClick={() => setCurrentStep(step.id)}
              className={`group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium ${
                currentStep === step.id
                  ? 'bg-navy-800 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span
                className={`mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                  currentStep === step.id
                    ? 'bg-white text-navy-800'
                    : 'border border-gray-300 text-gray-500 group-hover:border-navy-800'
                }`}
              >
                {step.id + 1}
              </span>
              <span>{step.name}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default FormStepper;
