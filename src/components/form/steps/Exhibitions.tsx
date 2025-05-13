
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
import { Exhibition } from '@/types';
import { toast } from '@/components/ui/use-toast';

const Exhibitions = () => {
  const { formData, setFormData } = useForm();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<Exhibition>({
    id: '',
    exhibitionName: '',
    venueName: '',
    startDate: '',
    endDate: '',
    venueLocation: '',
    exhibitionDescription: '',
    workDescription: '',
    selectionProcess: '',
    venuePrestige: '',
    exhibitionDocUrl: '',
    visualEvidenceUrl: '',
    reviewsUrl: ''
  });

  const handleOpenSheet = (item?: Exhibition) => {
    if (item) {
      setCurrentItem(item);
      setIsEditing(true);
    } else {
      setCurrentItem({
        id: uuidv4(),
        exhibitionName: '',
        venueName: '',
        startDate: '',
        endDate: '',
        venueLocation: '',
        exhibitionDescription: '',
        workDescription: '',
        selectionProcess: '',
        venuePrestige: '',
        exhibitionDocUrl: '',
        visualEvidenceUrl: '',
        reviewsUrl: ''
      });
      setIsEditing(false);
    }
  };

  const handleSave = () => {
    // Basic validation
    if (!currentItem.exhibitionName || !currentItem.venueName) {
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
        exhibitions: formData.exhibitions?.map(item => 
          item.id === currentItem.id ? currentItem : item
        ) || []
      });
      toast({
        title: "Updated",
        description: "Exhibition has been updated."
      });
    } else {
      // Add new item
      setFormData({
        ...formData,
        exhibitions: [...(formData.exhibitions || []), currentItem]
      });
      toast({
        title: "Added",
        description: "New exhibition has been added."
      });
    }
  };

  const handleDelete = (id: string) => {
    setFormData({
      ...formData,
      exhibitions: formData.exhibitions?.filter(item => item.id !== id) || []
    });
    toast({
      title: "Deleted",
      description: "Exhibition has been removed."
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Criterion 7: Display of Work at Artistic Exhibitions or Showcases
        </h2>
        <p className="mt-2 text-gray-600">
          Document the display of your work at artistic exhibitions or showcases.
        </p>
      </div>

      <div className="rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4">
        <p className="font-medium text-blue-800">Important</p>
        <p className="mt-1 text-sm text-blue-700">
          Your work must have been displayed at distinguished galleries, museums, or other venues. Evidence must show the significance of the venue and selection process.
        </p>
      </div>

      {(!formData.exhibitions || formData.exhibitions.length === 0) ? (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
          <h3 className="mb-2 text-lg font-medium text-gray-900">No exhibitions added yet.</h3>
          <p className="mb-4 max-w-sm text-sm text-gray-500">
            Add exhibitions or showcases where your work has been displayed.
          </p>
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                className="flex items-center gap-2 bg-navy-800 hover:bg-navy-700"
                onClick={() => handleOpenSheet()}
              >
                <Plus size={16} />
                Add Exhibition/Showcase
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Add Exhibition/Showcase</SheetTitle>
                <SheetDescription>
                  Provide details about exhibitions or showcases where your work has been displayed.
                </SheetDescription>
              </SheetHeader>
              
              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="exhibitionName" className="text-sm font-medium">Exhibition/Showcase Name *</label>
                  <Input 
                    id="exhibitionName" 
                    value={currentItem.exhibitionName} 
                    onChange={(e) => setCurrentItem({...currentItem, exhibitionName: e.target.value})}
                    placeholder="e.g., Annual Art Exhibition, Design Showcase" 
                  />
                </div>
                
                <div>
                  <label htmlFor="venueName" className="text-sm font-medium">Venue Name *</label>
                  <Input 
                    id="venueName" 
                    value={currentItem.venueName} 
                    onChange={(e) => setCurrentItem({...currentItem, venueName: e.target.value})}
                    placeholder="e.g., Metropolitan Museum of Art, Design Gallery" 
                  />
                </div>
                
                <div>
                  <label htmlFor="venueLocation" className="text-sm font-medium">Venue Location</label>
                  <Input 
                    id="venueLocation" 
                    value={currentItem.venueLocation} 
                    onChange={(e) => setCurrentItem({...currentItem, venueLocation: e.target.value})}
                    placeholder="e.g., New York, NY" 
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
                  <label htmlFor="exhibitionDescription" className="text-sm font-medium">Exhibition Description</label>
                  <Textarea 
                    id="exhibitionDescription" 
                    value={currentItem.exhibitionDescription} 
                    onChange={(e) => setCurrentItem({...currentItem, exhibitionDescription: e.target.value})}
                    placeholder="Describe the exhibition or showcase" 
                  />
                </div>
                
                <div>
                  <label htmlFor="workDescription" className="text-sm font-medium">Description of Work Displayed</label>
                  <Textarea 
                    id="workDescription" 
                    value={currentItem.workDescription} 
                    onChange={(e) => setCurrentItem({...currentItem, workDescription: e.target.value})}
                    placeholder="Describe the work you displayed at the exhibition" 
                  />
                </div>
                
                <div>
                  <label htmlFor="selectionProcess" className="text-sm font-medium">Selection Process</label>
                  <Textarea 
                    id="selectionProcess" 
                    value={currentItem.selectionProcess} 
                    onChange={(e) => setCurrentItem({...currentItem, selectionProcess: e.target.value})}
                    placeholder="How was your work selected for this exhibition? (e.g., juried, invitation)" 
                  />
                </div>
                
                <div>
                  <label htmlFor="venuePrestige" className="text-sm font-medium">Venue Prestige/Significance</label>
                  <Textarea 
                    id="venuePrestige" 
                    value={currentItem.venuePrestige} 
                    onChange={(e) => setCurrentItem({...currentItem, venuePrestige: e.target.value})}
                    placeholder="Explain why this venue is prestigious or significant in your field" 
                  />
                </div>
                
                <div>
                  <FileUpload
                    id="exhibitionDoc"
                    label="Exhibition Documentation"
                    hint="Upload exhibition catalog, program, or invitation (PDF, JPG, PNG)"
                    value={currentItem.exhibitionDocUrl}
                    onChange={(url) => setCurrentItem({...currentItem, exhibitionDocUrl: url})}
                    accept="application/pdf,image/jpeg,image/png"
                    maxSize={5}
                    path={`exhibitions/${currentItem.id}`}
                  />
                </div>
                
                <div>
                  <FileUpload
                    id="visualEvidence"
                    label="Visual Evidence"
                    hint="Upload photographs of your work at the exhibition (JPG, PNG)"
                    value={currentItem.visualEvidenceUrl}
                    onChange={(url) => setCurrentItem({...currentItem, visualEvidenceUrl: url})}
                    accept="image/jpeg,image/png"
                    maxSize={5}
                    path={`exhibitions/${currentItem.id}`}
                  />
                </div>
                
                <div>
                  <FileUpload
                    id="reviews"
                    label="Reviews or Media Coverage"
                    hint="Upload reviews or media coverage of the exhibition (PDF, JPG, PNG)"
                    value={currentItem.reviewsUrl}
                    onChange={(url) => setCurrentItem({...currentItem, reviewsUrl: url})}
                    accept="application/pdf,image/jpeg,image/png"
                    maxSize={5}
                    path={`exhibitions/${currentItem.id}`}
                  />
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <Button className="w-full" onClick={handleSave}>
                    {isEditing ? 'Update Exhibition' : 'Add Exhibition'}
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Your Exhibitions ({formData.exhibitions.length})</h3>
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
                {/* Form fields - same as above */}
                <SheetHeader>
                  <SheetTitle>{isEditing ? 'Edit' : 'Add'} Exhibition/Showcase</SheetTitle>
                  <SheetDescription>
                    Provide details about exhibitions or showcases where your work has been displayed.
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="exhibitionName" className="text-sm font-medium">Exhibition/Showcase Name *</label>
                    <Input 
                      id="exhibitionName" 
                      value={currentItem.exhibitionName} 
                      onChange={(e) => setCurrentItem({...currentItem, exhibitionName: e.target.value})}
                      placeholder="e.g., Annual Art Exhibition, Design Showcase" 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="venueName" className="text-sm font-medium">Venue Name *</label>
                    <Input 
                      id="venueName" 
                      value={currentItem.venueName} 
                      onChange={(e) => setCurrentItem({...currentItem, venueName: e.target.value})}
                      placeholder="e.g., Metropolitan Museum of Art, Design Gallery" 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="venueLocation" className="text-sm font-medium">Venue Location</label>
                    <Input 
                      id="venueLocation" 
                      value={currentItem.venueLocation} 
                      onChange={(e) => setCurrentItem({...currentItem, venueLocation: e.target.value})}
                      placeholder="e.g., New York, NY" 
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
                    <label htmlFor="exhibitionDescription" className="text-sm font-medium">Exhibition Description</label>
                    <Textarea 
                      id="exhibitionDescription" 
                      value={currentItem.exhibitionDescription} 
                      onChange={(e) => setCurrentItem({...currentItem, exhibitionDescription: e.target.value})}
                      placeholder="Describe the exhibition or showcase" 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="workDescription" className="text-sm font-medium">Description of Work Displayed</label>
                    <Textarea 
                      id="workDescription" 
                      value={currentItem.workDescription} 
                      onChange={(e) => setCurrentItem({...currentItem, workDescription: e.target.value})}
                      placeholder="Describe the work you displayed at the exhibition" 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="selectionProcess" className="text-sm font-medium">Selection Process</label>
                    <Textarea 
                      id="selectionProcess" 
                      value={currentItem.selectionProcess} 
                      onChange={(e) => setCurrentItem({...currentItem, selectionProcess: e.target.value})}
                      placeholder="How was your work selected for this exhibition? (e.g., juried, invitation)" 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="venuePrestige" className="text-sm font-medium">Venue Prestige/Significance</label>
                    <Textarea 
                      id="venuePrestige" 
                      value={currentItem.venuePrestige} 
                      onChange={(e) => setCurrentItem({...currentItem, venuePrestige: e.target.value})}
                      placeholder="Explain why this venue is prestigious or significant in your field" 
                    />
                  </div>
                  
                  <div>
                    <FileUpload
                      id="exhibitionDoc"
                      label="Exhibition Documentation"
                      hint="Upload exhibition catalog, program, or invitation (PDF, JPG, PNG)"
                      value={currentItem.exhibitionDocUrl}
                      onChange={(url) => setCurrentItem({...currentItem, exhibitionDocUrl: url})}
                      accept="application/pdf,image/jpeg,image/png"
                      maxSize={5}
                      path={`exhibitions/${currentItem.id}`}
                    />
                  </div>
                  
                  <div>
                    <FileUpload
                      id="visualEvidence"
                      label="Visual Evidence"
                      hint="Upload photographs of your work at the exhibition (JPG, PNG)"
                      value={currentItem.visualEvidenceUrl}
                      onChange={(url) => setCurrentItem({...currentItem, visualEvidenceUrl: url})}
                      accept="image/jpeg,image/png"
                      maxSize={5}
                      path={`exhibitions/${currentItem.id}`}
                    />
                  </div>
                  
                  <div>
                    <FileUpload
                      id="reviews"
                      label="Reviews or Media Coverage"
                      hint="Upload reviews or media coverage of the exhibition (PDF, JPG, PNG)"
                      value={currentItem.reviewsUrl}
                      onChange={(url) => setCurrentItem({...currentItem, reviewsUrl: url})}
                      accept="application/pdf,image/jpeg,image/png"
                      maxSize={5}
                      path={`exhibitions/${currentItem.id}`}
                    />
                  </div>
                  
                  <div className="mt-6 pt-4 border-t">
                    <Button className="w-full" onClick={handleSave}>
                      {isEditing ? 'Update Exhibition' : 'Add Exhibition'}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          <div className="space-y-4">
            {formData.exhibitions.map((item) => (
              <div key={item.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-md font-bold">{item.exhibitionName}</h4>
                    <p className="text-sm text-gray-500">{item.venueName}</p>
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

export default Exhibitions;
