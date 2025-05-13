
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
import { LeadingRole } from '@/types';
import { toast } from '@/components/ui/use-toast';

const LeadingRoles = () => {
  const { formData, setFormData } = useForm();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<LeadingRole>({
    id: '',
    organizationName: '',
    roleTitle: '',
    startDate: '',
    endDate: '',
    organizationDescription: '',
    responsibilities: '',
    achievements: '',
    reportingStructure: '',
    verificationUrl: '',
    organizationChartUrl: '',
    distinctionEvidenceUrl: '',
    recommendationUrl: ''
  });

  const handleOpenSheet = (item?: LeadingRole) => {
    if (item) {
      setCurrentItem(item);
      setIsEditing(true);
    } else {
      setCurrentItem({
        id: uuidv4(),
        organizationName: '',
        roleTitle: '',
        startDate: '',
        endDate: '',
        organizationDescription: '',
        responsibilities: '',
        achievements: '',
        reportingStructure: '',
        verificationUrl: '',
        organizationChartUrl: '',
        distinctionEvidenceUrl: '',
        recommendationUrl: ''
      });
      setIsEditing(false);
    }
  };

  const handleSave = () => {
    // Basic validation
    if (!currentItem.organizationName || !currentItem.roleTitle) {
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
        leadingRoles: formData.leadingRoles?.map(item => 
          item.id === currentItem.id ? currentItem : item
        ) || []
      });
      toast({
        title: "Updated",
        description: "Leading role has been updated."
      });
    } else {
      // Add new item
      setFormData({
        ...formData,
        leadingRoles: [...(formData.leadingRoles || []), currentItem]
      });
      toast({
        title: "Added",
        description: "New leading role has been added."
      });
    }
  };

  const handleDelete = (id: string) => {
    setFormData({
      ...formData,
      leadingRoles: formData.leadingRoles?.filter(item => item.id !== id) || []
    });
    toast({
      title: "Deleted",
      description: "Leading role has been removed."
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Criterion 8: Leading or Critical Role in Distinguished Organizations
        </h2>
        <p className="mt-2 text-gray-600">
          Document your performance in a leading or critical role for organizations with distinguished reputations.
        </p>
      </div>

      <div className="rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4">
        <p className="font-medium text-blue-800">Important</p>
        <p className="mt-1 text-sm text-blue-700">
          You must demonstrate both that your role was leading or critical AND that the organization has a distinguished reputation.
        </p>
      </div>

      {(!formData.leadingRoles || formData.leadingRoles.length === 0) ? (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
          <h3 className="mb-2 text-lg font-medium text-gray-900">No leading roles added yet.</h3>
          <p className="mb-4 max-w-sm text-sm text-gray-500">
            Add positions where you've performed in a leading or critical role for organizations with distinguished reputations.
          </p>
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                className="flex items-center gap-2 bg-navy-800 hover:bg-navy-700"
                onClick={() => handleOpenSheet()}
              >
                <Plus size={16} />
                Add Leading/Critical Role
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Add Leading/Critical Role</SheetTitle>
                <SheetDescription>
                  Provide details about your leading or critical role in a distinguished organization.
                </SheetDescription>
              </SheetHeader>
              
              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="organizationName" className="text-sm font-medium">Organization Name *</label>
                  <Input 
                    id="organizationName" 
                    value={currentItem.organizationName} 
                    onChange={(e) => setCurrentItem({...currentItem, organizationName: e.target.value})}
                    placeholder="e.g., Google, United Nations, Harvard University" 
                  />
                </div>
                
                <div>
                  <label htmlFor="roleTitle" className="text-sm font-medium">Role Title *</label>
                  <Input 
                    id="roleTitle" 
                    value={currentItem.roleTitle} 
                    onChange={(e) => setCurrentItem({...currentItem, roleTitle: e.target.value})}
                    placeholder="e.g., Director of Research, Board Member, Chief Scientist" 
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
                  <label htmlFor="organizationDescription" className="text-sm font-medium">Organization Description</label>
                  <Textarea 
                    id="organizationDescription" 
                    value={currentItem.organizationDescription} 
                    onChange={(e) => setCurrentItem({...currentItem, organizationDescription: e.target.value})}
                    placeholder="Describe the organization and explain why it has a distinguished reputation" 
                  />
                </div>
                
                <div>
                  <label htmlFor="responsibilities" className="text-sm font-medium">Key Responsibilities</label>
                  <Textarea 
                    id="responsibilities" 
                    value={currentItem.responsibilities} 
                    onChange={(e) => setCurrentItem({...currentItem, responsibilities: e.target.value})}
                    placeholder="Describe your key responsibilities in this role" 
                  />
                </div>
                
                <div>
                  <label htmlFor="achievements" className="text-sm font-medium">Major Achievements</label>
                  <Textarea 
                    id="achievements" 
                    value={currentItem.achievements} 
                    onChange={(e) => setCurrentItem({...currentItem, achievements: e.target.value})}
                    placeholder="Describe notable achievements during your tenure in this role" 
                  />
                </div>
                
                <div>
                  <label htmlFor="reportingStructure" className="text-sm font-medium">Reporting Structure</label>
                  <Textarea 
                    id="reportingStructure" 
                    value={currentItem.reportingStructure} 
                    onChange={(e) => setCurrentItem({...currentItem, reportingStructure: e.target.value})}
                    placeholder="Describe your position in the organizational hierarchy (e.g., who you reported to, who reported to you)" 
                  />
                </div>
                
                <div>
                  <FileUpload
                    id="verification"
                    label="Employment Verification"
                    hint="Upload letter of employment, contract, or other verification (PDF)"
                    value={currentItem.verificationUrl}
                    onChange={(url) => setCurrentItem({...currentItem, verificationUrl: url})}
                    accept="application/pdf"
                    maxSize={5}
                    path={`leading-roles/${currentItem.id}`}
                  />
                </div>
                
                <div>
                  <FileUpload
                    id="organizationChart"
                    label="Organization Chart"
                    hint="Upload organizational chart showing your position (PDF, JPG, PNG)"
                    value={currentItem.organizationChartUrl}
                    onChange={(url) => setCurrentItem({...currentItem, organizationChartUrl: url})}
                    accept="application/pdf,image/jpeg,image/png"
                    maxSize={5}
                    path={`leading-roles/${currentItem.id}`}
                  />
                </div>
                
                <div>
                  <FileUpload
                    id="distinctionEvidence"
                    label="Evidence of Organization's Distinction"
                    hint="Upload evidence of the organization's distinguished reputation (PDF)"
                    value={currentItem.distinctionEvidenceUrl}
                    onChange={(url) => setCurrentItem({...currentItem, distinctionEvidenceUrl: url})}
                    accept="application/pdf"
                    maxSize={5}
                    path={`leading-roles/${currentItem.id}`}
                  />
                </div>
                
                <div>
                  <FileUpload
                    id="recommendation"
                    label="Letter of Recommendation"
                    hint="Upload letter of recommendation or reference (PDF)"
                    value={currentItem.recommendationUrl}
                    onChange={(url) => setCurrentItem({...currentItem, recommendationUrl: url})}
                    accept="application/pdf"
                    maxSize={5}
                    path={`leading-roles/${currentItem.id}`}
                  />
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <Button className="w-full" onClick={handleSave}>
                    {isEditing ? 'Update Leading Role' : 'Add Leading Role'}
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Your Leading Roles ({formData.leadingRoles.length})</h3>
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
                  <SheetTitle>{isEditing ? 'Edit' : 'Add'} Leading/Critical Role</SheetTitle>
                  <SheetDescription>
                    Provide details about your leading or critical role in a distinguished organization.
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="organizationName" className="text-sm font-medium">Organization Name *</label>
                    <Input 
                      id="organizationName" 
                      value={currentItem.organizationName} 
                      onChange={(e) => setCurrentItem({...currentItem, organizationName: e.target.value})}
                      placeholder="e.g., Google, United Nations, Harvard University" 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="roleTitle" className="text-sm font-medium">Role Title *</label>
                    <Input 
                      id="roleTitle" 
                      value={currentItem.roleTitle} 
                      onChange={(e) => setCurrentItem({...currentItem, roleTitle: e.target.value})}
                      placeholder="e.g., Director of Research, Board Member, Chief Scientist" 
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
                    <label htmlFor="organizationDescription" className="text-sm font-medium">Organization Description</label>
                    <Textarea 
                      id="organizationDescription" 
                      value={currentItem.organizationDescription} 
                      onChange={(e) => setCurrentItem({...currentItem, organizationDescription: e.target.value})}
                      placeholder="Describe the organization and explain why it has a distinguished reputation" 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="responsibilities" className="text-sm font-medium">Key Responsibilities</label>
                    <Textarea 
                      id="responsibilities" 
                      value={currentItem.responsibilities} 
                      onChange={(e) => setCurrentItem({...currentItem, responsibilities: e.target.value})}
                      placeholder="Describe your key responsibilities in this role" 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="achievements" className="text-sm font-medium">Major Achievements</label>
                    <Textarea 
                      id="achievements" 
                      value={currentItem.achievements} 
                      onChange={(e) => setCurrentItem({...currentItem, achievements: e.target.value})}
                      placeholder="Describe notable achievements during your tenure in this role" 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="reportingStructure" className="text-sm font-medium">Reporting Structure</label>
                    <Textarea 
                      id="reportingStructure" 
                      value={currentItem.reportingStructure} 
                      onChange={(e) => setCurrentItem({...currentItem, reportingStructure: e.target.value})}
                      placeholder="Describe your position in the organizational hierarchy (e.g., who you reported to, who reported to you)" 
                    />
                  </div>
                  
                  <div>
                    <FileUpload
                      id="verification"
                      label="Employment Verification"
                      hint="Upload letter of employment, contract, or other verification (PDF)"
                      value={currentItem.verificationUrl}
                      onChange={(url) => setCurrentItem({...currentItem, verificationUrl: url})}
                      accept="application/pdf"
                      maxSize={5}
                      path={`leading-roles/${currentItem.id}`}
                    />
                  </div>
                  
                  <div>
                    <FileUpload
                      id="organizationChart"
                      label="Organization Chart"
                      hint="Upload organizational chart showing your position (PDF, JPG, PNG)"
                      value={currentItem.organizationChartUrl}
                      onChange={(url) => setCurrentItem({...currentItem, organizationChartUrl: url})}
                      accept="application/pdf,image/jpeg,image/png"
                      maxSize={5}
                      path={`leading-roles/${currentItem.id}`}
                    />
                  </div>
                  
                  <div>
                    <FileUpload
                      id="distinctionEvidence"
                      label="Evidence of Organization's Distinction"
                      hint="Upload evidence of the organization's distinguished reputation (PDF)"
                      value={currentItem.distinctionEvidenceUrl}
                      onChange={(url) => setCurrentItem({...currentItem, distinctionEvidenceUrl: url})}
                      accept="application/pdf"
                      maxSize={5}
                      path={`leading-roles/${currentItem.id}`}
                    />
                  </div>
                  
                  <div>
                    <FileUpload
                      id="recommendation"
                      label="Letter of Recommendation"
                      hint="Upload letter of recommendation or reference (PDF)"
                      value={currentItem.recommendationUrl}
                      onChange={(url) => setCurrentItem({...currentItem, recommendationUrl: url})}
                      accept="application/pdf"
                      maxSize={5}
                      path={`leading-roles/${currentItem.id}`}
                    />
                  </div>
                  
                  <div className="mt-6 pt-4 border-t">
                    <Button className="w-full" onClick={handleSave}>
                      {isEditing ? 'Update Leading Role' : 'Add Leading Role'}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          <div className="space-y-4">
            {formData.leadingRoles.map((item) => (
              <div key={item.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-md font-bold">{item.roleTitle}</h4>
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

export default LeadingRoles;
