
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
import { JudgingExperience } from '@/types';
import { toast } from '@/components/ui/use-toast';

const JudgingExperiences = () => {
  const { formData, setFormData } = useForm();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<JudgingExperience>({
    id: '',
    judgeRole: '',
    startDate: '',
    endDate: '',
    organizationName: '',
    description: '',
    selectionProcess: '',
    appointmentLetterUrl: '',
    evidenceUrl: ''
  });

  const handleOpenSheet = (item?: JudgingExperience) => {
    if (item) {
      setCurrentItem(item);
      setIsEditing(true);
    } else {
      setCurrentItem({
        id: uuidv4(),
        judgeRole: '',
        startDate: '',
        endDate: '',
        organizationName: '',
        description: '',
        selectionProcess: '',
        appointmentLetterUrl: '',
        evidenceUrl: ''
      });
      setIsEditing(false);
    }
  };

  const handleSave = () => {
    // Basic validation
    if (!currentItem.judgeRole || !currentItem.organizationName) {
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
        judgingExperiences: formData.judgingExperiences?.map(item => 
          item.id === currentItem.id ? currentItem : item
        ) || []
      });
      toast({
        title: "Updated",
        description: "Judging experience has been updated."
      });
    } else {
      // Add new item
      setFormData({
        ...formData,
        judgingExperiences: [...(formData.judgingExperiences || []), currentItem]
      });
      toast({
        title: "Added",
        description: "New judging experience has been added."
      });
    }
  };

  const handleDelete = (id: string) => {
    setFormData({
      ...formData,
      judgingExperiences: formData.judgingExperiences?.filter(item => item.id !== id) || []
    });
    toast({
      title: "Deleted",
      description: "Judging experience has been removed."
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Criterion 4: Judge of the Work of Others
        </h2>
        <p className="mt-2 text-gray-600">
          Document your participation as a judge of the work of others in your field or a related field.
        </p>
      </div>

      <div className="rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4">
        <p className="font-medium text-blue-800">Important</p>
        <p className="mt-1 text-sm text-blue-700">
          You must provide evidence of your role in judging, evaluating, or reviewing the work of others in your field.
        </p>
      </div>

      {(!formData.judgingExperiences || formData.judgingExperiences.length === 0) ? (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
          <h3 className="mb-2 text-lg font-medium text-gray-900">No judging experiences added yet.</h3>
          <p className="mb-4 max-w-sm text-sm text-gray-500">
            Add experiences where you've served as a judge, reviewer, or evaluator of others' work in your field.
          </p>
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                className="flex items-center gap-2 bg-navy-800 hover:bg-navy-700"
                onClick={() => handleOpenSheet()}
              >
                <Plus size={16} />
                Add Judging Experience
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Add Judging Experience</SheetTitle>
                <SheetDescription>
                  Provide details about your role as a judge or evaluator of others' work.
                </SheetDescription>
              </SheetHeader>
              
              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="judgeRole" className="text-sm font-medium">Judge Role/Title *</label>
                  <Input 
                    id="judgeRole" 
                    value={currentItem.judgeRole} 
                    onChange={(e) => setCurrentItem({...currentItem, judgeRole: e.target.value})}
                    placeholder="e.g., Journal Reviewer, Award Judge, Competition Juror" 
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
                
                <div>
                  <label htmlFor="organizationName" className="text-sm font-medium">Organization Name *</label>
                  <Input 
                    id="organizationName" 
                    value={currentItem.organizationName} 
                    onChange={(e) => setCurrentItem({...currentItem, organizationName: e.target.value})}
                    placeholder="e.g., IEEE, Journal of Science" 
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="text-sm font-medium">Description of Judging Role</label>
                  <Textarea 
                    id="description" 
                    value={currentItem.description} 
                    onChange={(e) => setCurrentItem({...currentItem, description: e.target.value})}
                    placeholder="Describe your duties and the nature of the work you evaluated" 
                  />
                </div>
                
                <div>
                  <label htmlFor="selectionProcess" className="text-sm font-medium">Selection Process</label>
                  <Textarea 
                    id="selectionProcess" 
                    value={currentItem.selectionProcess} 
                    onChange={(e) => setCurrentItem({...currentItem, selectionProcess: e.target.value})}
                    placeholder="How were you selected for this role? (e.g., invitation, selection committee)" 
                  />
                </div>
                
                <div>
                  <FileUpload
                    id="appointmentLetter"
                    label="Appointment Letter"
                    hint="Upload letter of appointment or invitation (PDF, JPG, PNG)"
                    value={currentItem.appointmentLetterUrl}
                    onChange={(url) => setCurrentItem({...currentItem, appointmentLetterUrl: url})}
                    accept="application/pdf,image/jpeg,image/png"
                    maxSize={5}
                    path={`judging/${currentItem.id}`}
                  />
                </div>
                
                <div>
                  <FileUpload
                    id="evidence"
                    label="Supporting Evidence"
                    hint="Upload additional evidence of your judging role (PDF, JPG, PNG)"
                    value={currentItem.evidenceUrl}
                    onChange={(url) => setCurrentItem({...currentItem, evidenceUrl: url})}
                    accept="application/pdf,image/jpeg,image/png"
                    maxSize={5}
                    path={`judging/${currentItem.id}`}
                  />
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <Button className="w-full" onClick={handleSave}>
                    {isEditing ? 'Update Judging Experience' : 'Add Judging Experience'}
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Your Judging Experiences ({formData.judgingExperiences.length})</h3>
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
                  <SheetTitle>{isEditing ? 'Edit' : 'Add'} Judging Experience</SheetTitle>
                  <SheetDescription>
                    Provide details about your role as a judge or evaluator of others' work.
                  </SheetDescription>
                </SheetHeader>
                
                {/* Form fields - same as above */}
                <div className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="judgeRole" className="text-sm font-medium">Judge Role/Title *</label>
                    <Input 
                      id="judgeRole" 
                      value={currentItem.judgeRole} 
                      onChange={(e) => setCurrentItem({...currentItem, judgeRole: e.target.value})}
                      placeholder="e.g., Journal Reviewer, Award Judge, Competition Juror" 
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
                  
                  <div>
                    <label htmlFor="organizationName" className="text-sm font-medium">Organization Name *</label>
                    <Input 
                      id="organizationName" 
                      value={currentItem.organizationName} 
                      onChange={(e) => setCurrentItem({...currentItem, organizationName: e.target.value})}
                      placeholder="e.g., IEEE, Journal of Science" 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="text-sm font-medium">Description of Judging Role</label>
                    <Textarea 
                      id="description" 
                      value={currentItem.description} 
                      onChange={(e) => setCurrentItem({...currentItem, description: e.target.value})}
                      placeholder="Describe your duties and the nature of the work you evaluated" 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="selectionProcess" className="text-sm font-medium">Selection Process</label>
                    <Textarea 
                      id="selectionProcess" 
                      value={currentItem.selectionProcess} 
                      onChange={(e) => setCurrentItem({...currentItem, selectionProcess: e.target.value})}
                      placeholder="How were you selected for this role? (e.g., invitation, selection committee)" 
                    />
                  </div>
                  
                  <div>
                    <FileUpload
                      id="appointmentLetter"
                      label="Appointment Letter"
                      hint="Upload letter of appointment or invitation (PDF, JPG, PNG)"
                      value={currentItem.appointmentLetterUrl}
                      onChange={(url) => setCurrentItem({...currentItem, appointmentLetterUrl: url})}
                      accept="application/pdf,image/jpeg,image/png"
                      maxSize={5}
                      path={`judging/${currentItem.id}`}
                    />
                  </div>
                  
                  <div>
                    <FileUpload
                      id="evidence"
                      label="Supporting Evidence"
                      hint="Upload additional evidence of your judging role (PDF, JPG, PNG)"
                      value={currentItem.evidenceUrl}
                      onChange={(url) => setCurrentItem({...currentItem, evidenceUrl: url})}
                      accept="application/pdf,image/jpeg,image/png"
                      maxSize={5}
                      path={`judging/${currentItem.id}`}
                    />
                  </div>
                  
                  <div className="mt-6 pt-4 border-t">
                    <Button className="w-full" onClick={handleSave}>
                      {isEditing ? 'Update Judging Experience' : 'Add Judging Experience'}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          <div className="space-y-4">
            {formData.judgingExperiences.map((item) => (
              <div key={item.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-md font-bold">{item.judgeRole}</h4>
                    <p className="text-sm text-gray-500">{item.organizationName}</p>
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

export default JudgingExperiences;
