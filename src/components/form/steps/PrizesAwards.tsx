
import { useState } from 'react';
import { useForm } from '@/contexts/FormContext';
import { Award, Award as AwardIcon, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FileUpload } from '@/components/ui/file-upload';
import { Card, CardContent } from '@/components/ui/card';
import { Award as AwardType } from '@/types';

const PrizesAwards = () => {
  const { formData, setFormData } = useForm();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentAward, setCurrentAward] = useState<AwardType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Form state
  const [fullName, setFullName] = useState('');
  const [awardName, setAwardName] = useState('');
  const [dateReceived, setDateReceived] = useState('');
  const [awardingOrg, setAwardingOrg] = useState('');
  const [description, setDescription] = useState('');
  const [criteria, setCriteria] = useState('');
  const [selectionProcess, setSelectionProcess] = useState('');
  const [certificateUrl, setCertificateUrl] = useState<string | undefined>();
  const [supportingDocUrl, setSupportingDocUrl] = useState<string | undefined>();

  // Reset form
  const resetForm = () => {
    setFullName('');
    setAwardName('');
    setDateReceived('');
    setAwardingOrg('');
    setDescription('');
    setCriteria('');
    setSelectionProcess('');
    setCertificateUrl(undefined);
    setSupportingDocUrl(undefined);
    setCurrentAward(null);
    setIsEditing(false);
  };

  // Open dialog for new award
  const handleAddAward = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  // Open dialog for editing
  const handleEditAward = (award: AwardType) => {
    setFullName(award.fullName);
    setAwardName(award.awardName);
    setDateReceived(award.dateReceived);
    setAwardingOrg(award.awardingOrganization);
    setDescription(award.awardDescription);
    setCriteria(award.awardCriteria);
    setSelectionProcess(award.selectionProcess);
    setCertificateUrl(award.certificateUrl);
    setSupportingDocUrl(award.supportingDocUrl);
    setCurrentAward(award);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  // Save award
  const handleSaveAward = () => {
    const award: AwardType = {
      id: isEditing && currentAward ? currentAward.id : `award-${Date.now()}`,
      fullName,
      awardName,
      dateReceived,
      awardingOrganization: awardingOrg,
      awardDescription: description,
      awardCriteria: criteria,
      selectionProcess,
      certificateUrl,
      supportingDocUrl
    };

    setFormData(prev => {
      if (isEditing && currentAward) {
        // Update existing award
        const updatedAwards = prev.awards.map(a => 
          a.id === currentAward.id ? award : a
        );
        return { ...prev, awards: updatedAwards };
      } else {
        // Add new award
        return { ...prev, awards: [...prev.awards, award] };
      }
    });

    resetForm();
    setIsDialogOpen(false);
  };

  // Delete award
  const handleDeleteAward = (id: string) => {
    setFormData(prev => ({
      ...prev,
      awards: prev.awards.filter(award => award.id !== id)
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Criterion 1: Nationally or Internationally Recognized Prizes or Awards
        </h2>
        <p className="mt-2 text-gray-600">
          Document receipt of lesser nationally or internationally recognized prizes or awards for excellence in your field.
        </p>
      </div>

      <div className="rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4">
        <p className="font-medium text-blue-800">Important</p>
        <p className="mt-1 text-sm text-blue-700">
          You must provide evidence that the prizes or awards you received are nationally or internationally recognized for excellence in your field.
        </p>
      </div>

      {/* Award list */}
      {formData.awards.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
          <AwardIcon className="mb-4 h-12 w-12 text-gray-400" />
          <h3 className="mb-2 text-lg font-medium text-gray-900">No awards/prizes added yet.</h3>
          <p className="mb-4 max-w-sm text-sm text-gray-500">
            Start adding awards or prizes that demonstrate your extraordinary ability in your field.
          </p>
          <Button onClick={handleAddAward} className="flex items-center gap-2 bg-navy-800 hover:bg-navy-700">
            <Plus size={16} />
            Add Award/Prize
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {formData.awards.map(award => (
            <Card key={award.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="border-b bg-gray-50 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-navy-600" />
                      <h3 className="font-medium text-navy-800">{award.awardName}</h3>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEditAward(award)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleDeleteAward(award.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Recipient Name</p>
                      <p className="text-gray-900">{award.fullName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Date Received</p>
                      <p className="text-gray-900">{award.dateReceived}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Awarding Organization</p>
                      <p className="text-gray-900">{award.awardingOrganization}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm font-medium text-gray-500">Award Description</p>
                      <p className="text-gray-900">{award.awardDescription}</p>
                    </div>
                    {award.certificateUrl && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">Certificate</p>
                        <a 
                          href={award.certificateUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          View Certificate
                        </a>
                      </div>
                    )}
                    {award.supportingDocUrl && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">Supporting Documentation</p>
                        <a 
                          href={award.supportingDocUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          View Supporting Documentation
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button 
            onClick={handleAddAward} 
            className="flex items-center gap-2 bg-navy-800 hover:bg-navy-700"
          >
            <Plus size={16} />
            Add Another Award/Prize
          </Button>
        </div>
      )}

      {/* Add/Edit Award Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Edit Award/Prize' : 'Add Award/Prize'}
            </DialogTitle>
            <DialogDescription>
              Document a nationally or internationally recognized prize or award you have received.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="fullName" className="mb-2 block text-sm font-medium">
                  Full Name
                </label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name as it appears on the award"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="awardName" className="mb-2 block text-sm font-medium">
                  Award Name
                </label>
                <Input
                  id="awardName"
                  placeholder="Enter the full name of the award"
                  value={awardName}
                  onChange={(e) => setAwardName(e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="dateReceived" className="mb-2 block text-sm font-medium">
                  Date Received
                </label>
                <Input
                  id="dateReceived"
                  type="date"
                  value={dateReceived}
                  onChange={(e) => setDateReceived(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="awardingOrg" className="mb-2 block text-sm font-medium">
                  Awarding Organization
                </label>
                <Input
                  id="awardingOrg"
                  placeholder="Enter the name of the organization that granted the award"
                  value={awardingOrg}
                  onChange={(e) => setAwardingOrg(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="description" className="mb-2 block text-sm font-medium">
                Award Description
              </label>
              <Textarea
                id="description"
                placeholder="Describe the award, its significance, and why it's nationally or internationally recognized"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
            
            <div>
              <label htmlFor="criteria" className="mb-2 block text-sm font-medium">
                Award Criteria
              </label>
              <Textarea
                id="criteria"
                placeholder="Describe the criteria for selection and how it relates to excellence in your field"
                value={criteria}
                onChange={(e) => setCriteria(e.target.value)}
                rows={3}
              />
            </div>
            
            <div>
              <label htmlFor="selectionProcess" className="mb-2 block text-sm font-medium">
                Selection Process
              </label>
              <Textarea
                id="selectionProcess"
                placeholder="Describe the selection process, including how competitive it was and who made the selection"
                value={selectionProcess}
                onChange={(e) => setSelectionProcess(e.target.value)}
                rows={3}
              />
            </div>
            
            <FileUpload
              id="certificate"
              label="Award Certificate or Notification"
              hint="PDF, JPG, or PNG files only (max 10MB)"
              value={certificateUrl}
              onChange={setCertificateUrl}
              path="awards/certificates"
              accept="application/pdf,image/png,image/jpeg"
              maxSize={10}
            />
            
            <FileUpload
              id="supportingDoc"
              label="Supporting Documentation"
              hint="Include evidence of the award's prestige, media coverage, or list of past winners"
              value={supportingDocUrl}
              onChange={setSupportingDocUrl}
              path="awards/supporting"
              accept="application/pdf,image/png,image/jpeg"
              maxSize={10}
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveAward}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PrizesAwards;
