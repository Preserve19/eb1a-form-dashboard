
import { useState } from 'react';
import { useForm } from '@/contexts/FormContext';
import { Users, Plus, Trash2 } from 'lucide-react';
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
} from '@/components/ui/dialog';
import { FileUpload } from '@/components/ui/file-upload';
import { Card, CardContent } from '@/components/ui/card';
import { Membership } from '@/types';

const Memberships = () => {
  const { formData, setFormData } = useForm();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentMembership, setCurrentMembership] = useState<Membership | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Form state
  const [associationName, setAssociationName] = useState('');
  const [memberSince, setMemberSince] = useState('');
  const [associationDescription, setAssociationDescription] = useState('');
  const [membershipRequirements, setMembershipRequirements] = useState('');
  const [contributions, setContributions] = useState('');
  const [certificateUrl, setCertificateUrl] = useState<string | undefined>();
  const [supportingDocUrl, setSupportingDocUrl] = useState<string | undefined>();

  // Reset form
  const resetForm = () => {
    setAssociationName('');
    setMemberSince('');
    setAssociationDescription('');
    setMembershipRequirements('');
    setContributions('');
    setCertificateUrl(undefined);
    setSupportingDocUrl(undefined);
    setCurrentMembership(null);
    setIsEditing(false);
  };

  // Open dialog for new membership
  const handleAddMembership = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  // Open dialog for editing
  const handleEditMembership = (membership: Membership) => {
    setAssociationName(membership.associationName);
    setMemberSince(membership.memberSince);
    setAssociationDescription(membership.associationDescription);
    setMembershipRequirements(membership.membershipRequirements);
    setContributions(membership.contributions);
    setCertificateUrl(membership.certificateUrl);
    setSupportingDocUrl(membership.supportingDocUrl);
    setCurrentMembership(membership);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  // Save membership
  const handleSaveMembership = () => {
    const membership: Membership = {
      id: isEditing && currentMembership ? currentMembership.id : `membership-${Date.now()}`,
      associationName,
      memberSince,
      associationDescription,
      membershipRequirements,
      contributions,
      certificateUrl,
      supportingDocUrl
    };

    setFormData(prev => {
      if (isEditing && currentMembership) {
        // Update existing membership
        const updatedMemberships = prev.memberships.map(m => 
          m.id === currentMembership.id ? membership : m
        );
        return { ...prev, memberships: updatedMemberships };
      } else {
        // Add new membership
        return { ...prev, memberships: [...prev.memberships, membership] };
      }
    });

    resetForm();
    setIsDialogOpen(false);
  };

  // Delete membership
  const handleDeleteMembership = (id: string) => {
    setFormData(prev => ({
      ...prev,
      memberships: prev.memberships.filter(membership => membership.id !== id)
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Criterion 2: Membership in Associations
        </h2>
        <p className="mt-2 text-gray-600">
          Document membership in associations that require outstanding achievement for membership.
        </p>
      </div>

      <div className="rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4">
        <p className="font-medium text-blue-800">Important</p>
        <p className="mt-1 text-sm text-blue-700">
          You must provide evidence that the association requires outstanding achievement as a prerequisite for membership.
        </p>
      </div>

      {/* Membership list */}
      {formData.memberships.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
          <Users className="mb-4 h-12 w-12 text-gray-400" />
          <h3 className="mb-2 text-lg font-medium text-gray-900">No memberships added yet.</h3>
          <p className="mb-4 max-w-sm text-sm text-gray-500">
            Start adding associations you belong to that require outstanding achievement for membership.
          </p>
          <Button onClick={handleAddMembership} className="flex items-center gap-2 bg-navy-800 hover:bg-navy-700">
            <Plus size={16} />
            Add Membership
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {formData.memberships.map(membership => (
            <Card key={membership.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="border-b bg-gray-50 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-navy-600" />
                      <h3 className="font-medium text-navy-800">{membership.associationName}</h3>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEditMembership(membership)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleDeleteMembership(membership.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Member Since</p>
                      <p className="text-gray-900">{membership.memberSince}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm font-medium text-gray-500">Association Description</p>
                      <p className="text-gray-900">{membership.associationDescription}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm font-medium text-gray-500">Membership Requirements</p>
                      <p className="text-gray-900">{membership.membershipRequirements}</p>
                    </div>
                    {membership.certificateUrl && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">Membership Certificate</p>
                        <a 
                          href={membership.certificateUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          View Certificate
                        </a>
                      </div>
                    )}
                    {membership.supportingDocUrl && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">Supporting Documentation</p>
                        <a 
                          href={membership.supportingDocUrl} 
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
            onClick={handleAddMembership} 
            className="flex items-center gap-2 bg-navy-800 hover:bg-navy-700"
          >
            <Plus size={16} />
            Add Another Membership
          </Button>
        </div>
      )}

      {/* Add/Edit Membership Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Edit Membership' : 'Add Membership'}
            </DialogTitle>
            <DialogDescription>
              Document membership in associations that require outstanding achievement for membership.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div>
              <label htmlFor="associationName" className="mb-2 block text-sm font-medium">
                Association Name
              </label>
              <Input
                id="associationName"
                placeholder="Enter the full name of the association"
                value={associationName}
                onChange={(e) => setAssociationName(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="memberSince" className="mb-2 block text-sm font-medium">
                Member Since
              </label>
              <Input
                id="memberSince"
                type="date"
                value={memberSince}
                onChange={(e) => setMemberSince(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="associationDescription" className="mb-2 block text-sm font-medium">
                Association Description
              </label>
              <Textarea
                id="associationDescription"
                placeholder="Describe the association and its significance in your field"
                value={associationDescription}
                onChange={(e) => setAssociationDescription(e.target.value)}
                rows={3}
              />
            </div>
            
            <div>
              <label htmlFor="membershipRequirements" className="mb-2 block text-sm font-medium">
                Membership Requirements
              </label>
              <Textarea
                id="membershipRequirements"
                placeholder="Describe the specific criteria or outstanding achievements required for membership"
                value={membershipRequirements}
                onChange={(e) => setMembershipRequirements(e.target.value)}
                rows={3}
              />
            </div>
            
            <div>
              <label htmlFor="contributions" className="mb-2 block text-sm font-medium">
                Your Contributions
              </label>
              <Textarea
                id="contributions"
                placeholder="Describe your role and contributions as a member of this association"
                value={contributions}
                onChange={(e) => setContributions(e.target.value)}
                rows={3}
              />
            </div>
            
            <FileUpload
              id="certificate"
              label="Membership Certificate or Card"
              hint="PDF, JPG, or PNG files only (max 10MB)"
              value={certificateUrl}
              onChange={setCertificateUrl}
              path="memberships/certificates"
              accept="application/pdf,image/png,image/jpeg"
              maxSize={10}
            />
            
            <FileUpload
              id="supportingDoc"
              label="Supporting Documentation"
              hint="Include evidence of the association's membership requirements and your qualification"
              value={supportingDocUrl}
              onChange={setSupportingDocUrl}
              path="memberships/supporting"
              accept="application/pdf,image/png,image/jpeg"
              maxSize={10}
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveMembership}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Memberships;
