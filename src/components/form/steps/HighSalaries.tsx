
import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useForm } from '@/contexts/FormContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FileUpload } from '@/components/ui/file-upload';
import { v4 as uuidv4 } from 'uuid';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HighSalary } from '@/types';
import { toast } from '@/components/ui/use-toast';

const HighSalaries = () => {
  const { formData, setFormData } = useForm();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<HighSalary>({
    id: '',
    employerName: '',
    startDate: '',
    endDate: '',
    baseSalary: '',
    currency: '',
    frequency: '',
    additionalCompensation: '',
    industryComparison: '',
    salaryDocUrl: '',
    industryEvidenceUrl: '',
    expertLettersUrl: ''
  });

  const handleOpenSheet = (item?: HighSalary) => {
    if (item) {
      setCurrentItem(item);
      setIsEditing(true);
    } else {
      setCurrentItem({
        id: uuidv4(),
        employerName: '',
        startDate: '',
        endDate: '',
        baseSalary: '',
        currency: '',
        frequency: '',
        additionalCompensation: '',
        industryComparison: '',
        salaryDocUrl: '',
        industryEvidenceUrl: '',
        expertLettersUrl: ''
      });
      setIsEditing(false);
    }
  };

  const handleSave = () => {
    // Basic validation
    if (!currentItem.employerName || !currentItem.baseSalary) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields."
      });
      return;
    }

    if (isEditing) {
      // Update existing item
      setFormData({
        ...formData,
        highSalaries: formData.highSalaries?.map(item => 
          item.id === currentItem.id ? currentItem : item
        ) || []
      });
      toast({
        title: "Updated",
        description: "Salary information has been updated."
      });
    } else {
      // Add new item
      setFormData({
        ...formData,
        highSalaries: [...(formData.highSalaries || []), currentItem]
      });
      toast({
        title: "Added",
        description: "New salary information has been added."
      });
    }
  };

  const handleDelete = (id: string) => {
    setFormData({
      ...formData,
      highSalaries: formData.highSalaries?.filter(item => item.id !== id) || []
    });
    toast({
      title: "Deleted",
      description: "Salary information has been removed."
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Criterion 9: High Salary Evidence
        </h2>
        <p className="mt-2 text-gray-600">
          Document that you have commanded a high salary or other significantly high remuneration for your services.
        </p>
      </div>

      <div className="rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4">
        <p className="font-medium text-blue-800">Important</p>
        <p className="mt-1 text-sm text-blue-700">
          You must demonstrate that your salary or remuneration is significantly higher than others in your field, reflecting your extraordinary ability.
        </p>
      </div>

      {(!formData.highSalaries || formData.highSalaries.length === 0) ? (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
          <h3 className="mb-2 text-lg font-medium text-gray-900">No salary evidence added yet.</h3>
          <p className="mb-4 max-w-sm text-sm text-gray-500">
            Add evidence of high salary or remuneration that demonstrates your extraordinary ability in your field.
          </p>
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                className="flex items-center gap-2 bg-navy-800 hover:bg-navy-700"
                onClick={() => handleOpenSheet()}
              >
                <Plus size={16} />
                Add Salary/Remuneration Evidence
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Add Salary/Remuneration Evidence</SheetTitle>
                <SheetDescription>
                  Provide details about your high salary or remuneration.
                </SheetDescription>
              </SheetHeader>
              
              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="employerName" className="text-sm font-medium">Employer/Client Name *</label>
                  <Input 
                    id="employerName" 
                    value={currentItem.employerName} 
                    onChange={(e) => setCurrentItem({...currentItem, employerName: e.target.value})}
                    placeholder="e.g., Google, Netflix, Self-employed" 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startDate" className="text-sm font-medium">Start Date</label>
                    <Input 
                      id="startDate" 
                      type="date" 
                      value={currentItem.startDate} 
                      onChange={(e) => setCurrentItem({...currentItem, startDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <label htmlFor="endDate" className="text-sm font-medium">End Date</label>
                    <Input 
                      id="endDate" 
                      type="date" 
                      value={currentItem.endDate} 
                      onChange={(e) => setCurrentItem({...currentItem, endDate: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="baseSalary" className="text-sm font-medium">Base Salary/Rate *</label>
                    <Input 
                      id="baseSalary" 
                      value={currentItem.baseSalary} 
                      onChange={(e) => setCurrentItem({...currentItem, baseSalary: e.target.value})}
                      placeholder="e.g., 150000" 
                    />
                  </div>
                  <div>
                    <label htmlFor="currency" className="text-sm font-medium">Currency</label>
                    <Input 
                      id="currency" 
                      value={currentItem.currency} 
                      onChange={(e) => setCurrentItem({...currentItem, currency: e.target.value})}
                      placeholder="e.g., USD" 
                    />
                  </div>
                  <div>
                    <label htmlFor="frequency" className="text-sm font-medium">Frequency</label>
                    <Input 
                      id="frequency" 
                      value={currentItem.frequency} 
                      onChange={(e) => setCurrentItem({...currentItem, frequency: e.target.value})}
                      placeholder="e.g., Annual" 
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="additionalCompensation" className="text-sm font-medium">Additional Compensation</label>
                  <Textarea 
                    id="additionalCompensation" 
                    value={currentItem.additionalCompensation} 
                    onChange={(e) => setCurrentItem({...currentItem, additionalCompensation: e.target.value})}
                    placeholder="Describe bonuses, stock options, royalties, or other compensation" 
                  />
                </div>
                
                <div>
                  <label htmlFor="industryComparison" className="text-sm font-medium">Industry Comparison</label>
                  <Textarea 
                    id="industryComparison" 
                    value={currentItem.industryComparison} 
                    onChange={(e) => setCurrentItem({...currentItem, industryComparison: e.target.value})}
                    placeholder="Explain how your salary/remuneration compares to others in your field" 
                  />
                </div>
                
                <div>
                  <FileUpload
                    id="salaryDoc"
                    label="Salary Documentation"
                    hint="Upload pay stubs, tax returns, W-2 forms, or contracts (PDF)"
                    value={currentItem.salaryDocUrl}
                    onChange={(url) => setCurrentItem({...currentItem, salaryDocUrl: url})}
                    accept="application/pdf"
                    maxSize={5}
                    path={`high-salaries/${currentItem.id}`}
                  />
                </div>
                
                <div>
                  <FileUpload
                    id="industryEvidence"
                    label="Industry Comparison Evidence"
                    hint="Upload industry salary surveys or reports (PDF)"
                    value={currentItem.industryEvidenceUrl}
                    onChange={(url) => setCurrentItem({...currentItem, industryEvidenceUrl: url})}
                    accept="application/pdf"
                    maxSize={5}
                    path={`high-salaries/${currentItem.id}`}
                  />
                </div>
                
                <div>
                  <FileUpload
                    id="expertLetters"
                    label="Expert Letters"
                    hint="Upload expert letters or testimonials about your high salary (PDF)"
                    value={currentItem.expertLettersUrl}
                    onChange={(url) => setCurrentItem({...currentItem, expertLettersUrl: url})}
                    accept="application/pdf"
                    maxSize={5}
                    path={`high-salaries/${currentItem.id}`}
                  />
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <Button className="w-full" onClick={handleSave}>
                    {isEditing ? 'Update Salary Information' : 'Add Salary Information'}
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Your Salary Evidence ({formData.highSalaries.length})</h3>
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => handleOpenSheet()}
                >
                  <Plus size={16} />
                  Add New
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>{isEditing ? 'Edit' : 'Add'} Salary/Remuneration Evidence</SheetTitle>
                  <SheetDescription>
                    Provide details about your high salary or remuneration.
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="employerName" className="text-sm font-medium">Employer/Client Name *</label>
                    <Input 
                      id="employerName" 
                      value={currentItem.employerName} 
                      onChange={(e) => setCurrentItem({...currentItem, employerName: e.target.value})}
                      placeholder="e.g., Google, Netflix, Self-employed" 
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="startDate" className="text-sm font-medium">Start Date</label>
                      <Input 
                        id="startDate" 
                        type="date" 
                        value={currentItem.startDate} 
                        onChange={(e) => setCurrentItem({...currentItem, startDate: e.target.value})}
                      />
                    </div>
                    <div>
                      <label htmlFor="endDate" className="text-sm font-medium">End Date</label>
                      <Input 
                        id="endDate" 
                        type="date" 
                        value={currentItem.endDate} 
                        onChange={(e) => setCurrentItem({...currentItem, endDate: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="baseSalary" className="text-sm font-medium">Base Salary/Rate *</label>
                      <Input 
                        id="baseSalary" 
                        value={currentItem.baseSalary} 
                        onChange={(e) => setCurrentItem({...currentItem, baseSalary: e.target.value})}
                        placeholder="e.g., 150000" 
                      />
                    </div>
                    <div>
                      <label htmlFor="currency" className="text-sm font-medium">Currency</label>
                      <Input 
                        id="currency" 
                        value={currentItem.currency} 
                        onChange={(e) => setCurrentItem({...currentItem, currency: e.target.value})}
                        placeholder="e.g., USD" 
                      />
                    </div>
                    <div>
                      <label htmlFor="frequency" className="text-sm font-medium">Frequency</label>
                      <Input 
                        id="frequency" 
                        value={currentItem.frequency} 
                        onChange={(e) => setCurrentItem({...currentItem, frequency: e.target.value})}
                        placeholder="e.g., Annual" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="additionalCompensation" className="text-sm font-medium">Additional Compensation</label>
                    <Textarea 
                      id="additionalCompensation" 
                      value={currentItem.additionalCompensation} 
                      onChange={(e) => setCurrentItem({...currentItem, additionalCompensation: e.target.value})}
                      placeholder="Describe bonuses, stock options, royalties, or other compensation" 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="industryComparison" className="text-sm font-medium">Industry Comparison</label>
                    <Textarea 
                      id="industryComparison" 
                      value={currentItem.industryComparison} 
                      onChange={(e) => setCurrentItem({...currentItem, industryComparison: e.target.value})}
                      placeholder="Explain how your salary/remuneration compares to others in your field" 
                    />
                  </div>
                  
                  <div>
                    <FileUpload
                      id="salaryDoc"
                      label="Salary Documentation"
                      hint="Upload pay stubs, tax returns, W-2 forms, or contracts (PDF)"
                      value={currentItem.salaryDocUrl}
                      onChange={(url) => setCurrentItem({...currentItem, salaryDocUrl: url})}
                      accept="application/pdf"
                      maxSize={5}
                      path={`high-salaries/${currentItem.id}`}
                    />
                  </div>
                  
                  <div>
                    <FileUpload
                      id="industryEvidence"
                      label="Industry Comparison Evidence"
                      hint="Upload industry salary surveys or reports (PDF)"
                      value={currentItem.industryEvidenceUrl}
                      onChange={(url) => setCurrentItem({...currentItem, industryEvidenceUrl: url})}
                      accept="application/pdf"
                      maxSize={5}
                      path={`high-salaries/${currentItem.id}`}
                    />
                  </div>
                  
                  <div>
                    <FileUpload
                      id="expertLetters"
                      label="Expert Letters"
                      hint="Upload expert letters or testimonials about your high salary (PDF)"
                      value={currentItem.expertLettersUrl}
                      onChange={(url) => setCurrentItem({...currentItem, expertLettersUrl: url})}
                      accept="application/pdf"
                      maxSize={5}
                      path={`high-salaries/${currentItem.id}`}
                    />
                  </div>
                  
                  <div className="mt-6 pt-4 border-t">
                    <Button className="w-full" onClick={handleSave}>
                      {isEditing ? 'Update Salary Information' : 'Add Salary Information'}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          <div className="space-y-4">
            {formData.highSalaries.map((item) => (
              <div key={item.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-md font-bold">{item.employerName}</h4>
                    <p className="text-sm text-gray-500">
                      {item.baseSalary} {item.currency} {item.frequency && `(${item.frequency})`}
                    </p>
                    {item.startDate && (
                      <p className="text-sm text-gray-500">
                        {item.startDate} {item.endDate ? `to ${item.endDate}` : 'to Present'}
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenSheet(item)}
                    >
                      <Edit size={16} />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 size={16} />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HighSalaries;
