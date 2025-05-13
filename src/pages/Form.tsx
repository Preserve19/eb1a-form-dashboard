
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@/contexts/FormContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Save, FileCheck } from 'lucide-react';
import FormStepper from '@/components/form/FormStepper';
import Instructions from '@/components/form/steps/Instructions';
import PrizesAwards from '@/components/form/steps/PrizesAwards';
import Memberships from '@/components/form/steps/Memberships';
import PublishedMaterials from '@/components/form/steps/PublishedMaterials';
import JudgingExperiences from '@/components/form/steps/JudgingExperiences';
import OriginalContributions from '@/components/form/steps/OriginalContributions';
import ScholarlyArticles from '@/components/form/steps/ScholarlyArticles';
import Exhibitions from '@/components/form/steps/Exhibitions';
import LeadingRoles from '@/components/form/steps/LeadingRoles';
import HighSalaries from '@/components/form/steps/HighSalaries';
import CommercialSuccesses from '@/components/form/steps/CommercialSuccesses';
import FinalReview from '@/components/form/steps/FinalReview';

const Form = () => {
  const { formData, currentStep, setCurrentStep, saveProgress, submitForm, isLoading } = useForm();
  const navigate = useNavigate();
  
  // Redirect if no user information
  useEffect(() => {
    if (!formData.fullName || !formData.email) {
      navigate('/welcome');
    }
  }, [formData, navigate]);
  
  // Define the form steps
  const formSteps = [
    { title: 'Instructions', component: <Instructions /> },
    { title: 'Prizes & Awards', component: <PrizesAwards /> },
    { title: 'Memberships', component: <Memberships /> },
    { title: 'Published Material', component: <PublishedMaterials /> },
    { title: "Judge of Others' Work", component: <JudgingExperiences /> },
    { title: 'Original Contributions', component: <OriginalContributions /> },
    { title: 'Scholarly Articles', component: <ScholarlyArticles /> },
    { title: 'Artistic Exhibitions', component: <Exhibitions /> },
    { title: 'Leading Role', component: <LeadingRoles /> },
    { title: 'High Salary', component: <HighSalaries /> },
    { title: 'Commercial Success', component: <CommercialSuccesses /> },
    { title: 'Review & Submit', component: <FinalReview /> }
  ];
  
  // Calculate progress percentage
  const progressPercentage = Math.round((currentStep / (formSteps.length - 1)) * 100);
  
  // Handle navigation
  const handleNext = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleSaveProgress = async () => {
    await saveProgress();
  };
  
  const handleSubmitForm = async () => {
    await submitForm();
    navigate('/success');
  };

  const currentStepInfo = formSteps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === formSteps.length - 1;
  const stepNumber = currentStep + 1;
  const totalSteps = formSteps.length;
  
  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <header className="bg-navy-800 px-4 py-6 text-white">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">EB1A Application Form</h1>
          <p className="mt-2">Complete the following sections to prepare your EB1A application documentation.</p>
          
          {currentStep > 0 && (
            <>
              <div className="mt-6">
                <p className="mb-1">
                  Step {stepNumber} of {totalSteps} ({currentStepInfo.title})
                </p>
                <Progress value={progressPercentage} className="h-2 bg-navy-200" />
              </div>
              <p className="mt-1 text-right text-sm">{progressPercentage}% complete</p>
            </>
          )}
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <Card className="overflow-hidden bg-white p-8 shadow-md">
            {currentStepInfo.component}
          </Card>
          
          <div className="mt-6 flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              disabled={isFirstStep || isLoading}
              onClick={handlePrevious}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Previous
            </Button>
            
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleSaveProgress}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <Save size={16} />
                Save Progress
              </Button>
              
              {isLastStep ? (
                <Button
                  type="button"
                  onClick={handleSubmitForm}
                  disabled={isLoading}
                  className="flex items-center gap-2 bg-navy-800 text-white hover:bg-navy-700"
                >
                  <FileCheck size={16} />
                  Submit Application
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={isLoading}
                  className="flex items-center gap-2 bg-navy-800 text-white hover:bg-navy-700"
                >
                  Save and Continue
                  <ArrowRight size={16} />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
