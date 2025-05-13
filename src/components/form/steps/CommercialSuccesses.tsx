
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
import { CommercialSuccess } from '@/types';
import { toast } from '@/components/ui/use-toast';

const CommercialSuccesses = () => {
  const { formData, setFormData } = useForm();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<CommercialSuccess>({
    id: '',
    projectTitle: '',
    projectType: '',
    releaseDate: '',
    role: '',
    metrics: '',
    industryContext: '',
    criticalReception: '',
    salesDocUrl: '',
    mediaCoverageUrl: '',
    recognitionUrl: '',
    contractsUrl: ''
  });

  const handleOpenSheet = (item?: CommercialSuccess) => {
    if (item) {
      setCurrentItem(item);
      setIsEditing(true);
    } else {
      setCurrentItem({
        id: uuidv4(),
        projectTitle: '',
        projectType: '',
        releaseDate: '',
        role: '',
        metrics: '',
        industryContext: '',
        criticalReception: '',
        salesDocUrl: '',
        mediaCoverageUrl: '',
        recognitionUrl: '',
        contractsUrl: ''
      });
      setIsEditing(false);
    }
  };

  const handleSave = () => {
    // Basic validation
    if (!currentItem.projectTitle || !currentItem.projectType) {
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
        commercialSuccesses: formData.commercialSuccesses?.map(item => 
          item.id === currentItem.id ? currentItem : item
        ) || []
      });
      toast({
        title: "Updated",
        description: "Commercial success has been updated."
      });
    } else {
      // Add new item
      setFormData({
        ...formData,
        commercialSuccesses: [...(formData.commercialSuccesses || []), currentItem]
      });
      toast({
        title: "Added",
        description: "New commercial success has been added."
      });
    }
  };

  const handleDelete = (id: string) => {
    setFormData({
      ...formData,
      commercialSuccesses: formData.commercialSuccesses?.filter(item => item.id !== id) || []
    });
    toast({
      title: "Deleted",
      description: "Commercial success has been removed."
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Criterion 10: Commercial Success in the Performing Arts
        </h2>
        <p className="mt-2 text-gray-600">
          Document your commercial success in the performing arts, as shown by box office receipts or record, cassette, compact disk, or video sales.
        </p>
      </div>

      <div className="rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4">
        <p className="font-medium text-blue-800">Important</p>
        <p className="mt-1 text-sm text-blue-700">
          You must provide objective evidence of commercial success in the performing arts, such as sales figures, box office receipts, or other measurable indicators.
        </p>
      </div>

      {(!formData.commercialSuccesses || formData.commercialSuccesses.length === 0) ? (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
          <h3 className="mb-2 text-lg font-medium text-gray-900">No commercial success evidence added yet.</h3>
          <p className="mb-4 max-w-sm text-sm text-gray-500">
            Add evidence of commercial success in the performing arts, such as box office receipts, sales figures, or streaming statistics.
          </p>
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                className="flex items-center gap-2 bg-navy-800 hover:bg-navy-700"
                onClick={() => handleOpenSheet()}
              >
                <Plus size={16} />
                Add Commercial Success Evidence
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Add Commercial Success Evidence</SheetTitle>
                <SheetDescription>
                  Provide details about your commercial success in the performing arts.
                </SheetDescription>
              </SheetHeader>
              
              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="projectTitle" className="text-sm font-medium">Project/Production Title *</label>
                  <Input 
                    id="projectTitle" 
                    value={currentItem.projectTitle} 
                    onChange={(e) => setCurrentItem({...currentItem, projectTitle: e.target.value})}
                    placeholder="e.g., Album Name, Film Title, Theater Production" 
                  />
                </div>
                
                <div>
                  <label htmlFor="projectType" className="text-sm font-medium">Project Type *</label>
                  <Input 
                    id="projectType" 
                    value={currentItem.projectType} 
                    onChange={(e) => setCurrentItem({...currentItem, projectType: e.target.value})}
                    placeholder="e.g., Film, Album, Concert Tour, Theater Production" 
                  />
                </div>
                
                <div>
                  <label htmlFor="releaseDate" className="text-sm font-medium">Release/Performance Date</label>
                  <Input 
                    id="releaseDate" 
                    type="date" 
                    value={currentItem.releaseDate} 
                    onChange={(e) => setCurrentItem({...currentItem, releaseDate: e.target.value})}
                  />
                </div>
                
                <div>
                  <label htmlFor="role" className="text-sm font-medium">Your Role</label>
                  <Input 
                    id="role" 
                    value={currentItem.role} 
                    onChange={(e) => setCurrentItem({...currentItem, role: e.target.value})}
                    placeholder="e.g., Lead Actor, Singer, Director, Producer" 
                  />
                </div>
                
                <div>
                  <label htmlFor="metrics" className="text-sm font-medium">Commercial Success Metrics</label>
                  <Textarea 
                    id="metrics" 
                    value={currentItem.metrics} 
                    onChange={(e) => setCurrentItem({...currentItem, metrics: e.target.value})}
                    placeholder="Describe sales figures, box office receipts, or other quantifiable metrics of success" 
                  />
                </div>
                
                <div>
                  <label htmlFor="industryContext" className="text-sm font-medium">Industry Context</label>
                  <Textarea 
                    id="industryContext" 
                    value={currentItem.industryContext} 
                    onChange={(e) => setCurrentItem({...currentItem, industryContext: e.target.value})}
                    placeholder="Explain why these numbers are significant in your industry" 
                  />
                </div>
                
                <div>
                  <label htmlFor="criticalReception" className="text-sm font-medium">Critical Reception</label>
                  <Textarea 
                    id="criticalReception" 
                    value={currentItem.criticalReception} 
                    onChange={(e) => setCurrentItem({...currentItem, criticalReception: e.target.value})}
                    placeholder="Describe critical reviews, ratings, or audience reception" 
                  />
                </div>
                
                <div>
                  <FileUpload
                    id="salesDoc"
                    label="Sales Documentation"
                    hint="Upload sales reports, box office statements, or other evidence (PDF)"
                    value={currentItem.salesDocUrl}
                    onChange={(url) => setCurrentItem({...currentItem, salesDocUrl: url})}
                    accept="application/pdf"
                    maxSize={5}
                    path={`commercial-success/${currentItem.id}`}
                  />
                </div>
                
                <div>
                  <FileUpload
                    id="mediaCoverage"
                    label="Media Coverage"
                    hint="Upload media articles, reviews, or press (PDF, JPG, PNG)"
                    value={currentItem.mediaCoverageUrl}
                    onChange={(url) => setCurrentItem({...currentItem, mediaCoverageUrl: url})}
                    accept="application/pdf,image/jpeg,image/png"
                    maxSize={5}
                    path={`commercial-success/${currentItem.id}`}
                  />
                </div>
                
                <div>
                  <FileUpload
                    id="recognition"
                    label="Awards/Recognition"
                    hint="Upload evidence of awards or recognition (PDF, JPG, PNG)"
                    value={currentItem.recognitionUrl}
                    onChange={(url) => setCurrentItem({...currentItem, recognitionUrl: url})}
                    accept="application/pdf,image/jpeg,image/png"
                    maxSize={5}
                    path={`commercial-success/${currentItem.id}`}
                  />
                </div>
                
                <div>
                  <FileUpload
                    id="contracts"
                    label="Contracts/Agreements"
                    hint="Upload relevant contracts or agreements (PDF)"
                    value={currentItem.contractsUrl}
                    onChange={(url) => setCurrentItem({...currentItem, contractsUrl: url})}
                    accept="application/pdf"
                    maxSize={5}
                    path={`commercial-success/${currentItem.id}`}
                  />
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <Button className="w-full" onClick={handleSave}>
                    {isEditing ? 'Update Commercial Success' : 'Add Commercial Success'}
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Your Commercial Successes ({formData.commercialSuccesses.length})</h3>
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
                  <SheetTitle>{isEditing ? 'Edit' : 'Add'} Commercial Success Evidence</SheetTitle>
                  <SheetDescription>
                    Provide details about your commercial success in the performing arts.
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="projectTitle" className="text-sm font-medium">Project/Production Title *</label>
                    <Input 
                      id="projectTitle" 
                      value={currentItem.projectTitle} 
                      onChange={(e) => setCurrentItem({...currentItem, projectTitle: e.target.value})}
                      placeholder="e.g., Album Name, Film Title, Theater Production" 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="projectType" className="text-sm font-medium">Project Type *</label>
                    <Input 
                      id="projectType" 
                      value={currentItem.projectType} 
                      onChange={(e) => setCurrentItem({...currentItem, projectType: e.target.value})}
                      placeholder="e.g., Film, Album, Concert Tour, Theater Production" 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="releaseDate" className="text-sm font-medium">Release/Performance Date</label>
                    <Input 
                      id="releaseDate" 
                      type="date" 
                      value={currentItem.releaseDate} 
                      onChange={(e) => setCurrentItem({...currentItem, releaseDate: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="role" className="text-sm font-medium">Your Role</label>
                    <Input 
                      id="role" 
                      value={currentItem.role} 
                      onChange={(e) => setCurrentItem({...currentItem, role: e.target.value})}
                      placeholder="e.g., Lead Actor, Singer, Director, Producer" 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="metrics" className="text-sm font-medium">Commercial Success Metrics</label>
                    <Textarea 
                      id="metrics" 
                      value={currentItem.metrics} 
                      onChange={(e) => setCurrentItem({...currentItem, metrics: e.target.value})}
                      placeholder="Describe sales figures, box office receipts, or other quantifiable metrics of success" 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="industryContext" className="text-sm font-medium">Industry Context</label>
                    <Textarea 
                      id="industryContext" 
                      value={currentItem.industryContext} 
                      onChange={(e) => setCurrentItem({...currentItem, industryContext: e.target.value})}
                      placeholder="Explain why these numbers are significant in your industry" 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="criticalReception" className="text-sm font-medium">Critical Reception</label>
                    <Textarea 
                      id="criticalReception" 
                      value={currentItem.criticalReception} 
                      onChange={(e) => setCurrentItem({...currentItem, criticalReception: e.target.value})}
                      placeholder="Describe critical reviews, ratings, or audience reception" 
                    />
                  </div>
                  
                  <div>
                    <FileUpload
                      id="salesDoc"
                      label="Sales Documentation"
                      hint="Upload sales reports, box office statements, or other evidence (PDF)"
                      value={currentItem.salesDocUrl}
                      onChange={(url) => setCurrentItem({...currentItem, salesDocUrl: url})}
                      accept="application/pdf"
                      maxSize={5}
                      path={`commercial-success/${currentItem.id}`}
                    />
                  </div>
                  
                  <div>
                    <FileUpload
                      id="mediaCoverage"
                      label="Media Coverage"
                      hint="Upload media articles, reviews, or press (PDF, JPG, PNG)"
                      value={currentItem.mediaCoverageUrl}
                      onChange={(url) => setCurrentItem({...currentItem, mediaCoverageUrl: url})}
                      accept="application/pdf,image/jpeg,image/png"
                      maxSize={5}
                      path={`commercial-success/${currentItem.id}`}
                    />
                  </div>
                  
                  <div>
                    <FileUpload
                      id="recognition"
                      label="Awards/Recognition"
                      hint="Upload evidence of awards or recognition (PDF, JPG, PNG)"
                      value={currentItem.recognitionUrl}
                      onChange={(url) => setCurrentItem({...currentItem, recognitionUrl: url})}
                      accept="application/pdf,image/jpeg,image/png"
                      maxSize={5}
                      path={`commercial-success/${currentItem.id}`}
                    />
                  </div>
                  
                  <div>
                    <FileUpload
                      id="contracts"
                      label="Contracts/Agreements"
                      hint="Upload relevant contracts or agreements (PDF)"
                      value={currentItem.contractsUrl}
                      onChange={(url) => setCurrentItem({...currentItem, contractsUrl: url})}
                      accept="application/pdf"
                      maxSize={5}
                      path={`commercial-success/${currentItem.id}`}
                    />
                  </div>
                  
                  <div className="mt-6 pt-4 border-t">
                    <Button className="w-full" onClick={handleSave}>
                      {isEditing ? 'Update Commercial Success' : 'Add Commercial Success'}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          <div className="space-y-4">
            {formData.commercialSuccesses.map((item) => (
              <div key={item.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-md font-bold">{item.projectTitle}</h4>
                    <p className="text-sm text-gray-500">{item.projectType}</p>
                    {item.releaseDate && (
                      <p className="text-sm text-gray-500">Released: {item.releaseDate}</p>
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

export default CommercialSuccesses;
