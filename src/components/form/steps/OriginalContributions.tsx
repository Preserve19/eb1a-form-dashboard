
import { useState } from 'react';
import { Plus, Edit, Trash, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useForm } from '@/contexts/FormContext';
import { OriginalContribution } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { FileUpload } from '@/components/ui/file-upload';

const OriginalContributions = () => {
  const { formData, setFormData } = useForm();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentContribution, setCurrentContribution] = useState<OriginalContribution | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [field, setField] = useState('');
  const [contributionDate, setContributionDate] = useState('');
  const [description, setDescription] = useState('');
  const [significance, setSignificance] = useState('');
  const [implementation, setImplementation] = useState('');
  const [evidenceUrl, setEvidenceUrl] = useState<string | undefined>(undefined);
  const [lettersUrl, setLettersUrl] = useState<string | undefined>(undefined);
  const [supportingDocUrl, setSupportingDocUrl] = useState<string | undefined>(undefined);

  const resetForm = () => {
    setTitle('');
    setField('');
    setContributionDate('');
    setDescription('');
    setSignificance('');
    setImplementation('');
    setEvidenceUrl(undefined);
    setLettersUrl(undefined);
    setSupportingDocUrl(undefined);
    setCurrentContribution(null);
    setIsEditMode(false);
  };

  const handleOpenDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEditContribution = (contribution: OriginalContribution) => {
    setCurrentContribution(contribution);
    setTitle(contribution.contributionTitle);
    setField(contribution.field);
    setContributionDate(contribution.contributionDate);
    setDescription(contribution.description);
    setSignificance(contribution.significance);
    setImplementation(contribution.implementation);
    setEvidenceUrl(contribution.evidenceUrl);
    setLettersUrl(contribution.lettersUrl);
    setSupportingDocUrl(contribution.supportingDocUrl);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleDeleteContribution = (id: string) => {
    setFormData({
      ...formData,
      originalContributions: formData.originalContributions.filter(contribution => contribution.id !== id)
    });
  };

  const handleSaveContribution = () => {
    if (!title || !field || !contributionDate || !description || !significance || !implementation) {
      // Show error message or validation
      return;
    }

    if (isEditMode && currentContribution) {
      // Update existing contribution
      const updatedContributions = formData.originalContributions.map(contribution => 
        contribution.id === currentContribution.id 
          ? {
              ...contribution,
              contributionTitle: title,
              field: field,
              contributionDate: contributionDate,
              description: description,
              significance: significance,
              implementation: implementation,
              evidenceUrl: evidenceUrl,
              lettersUrl: lettersUrl,
              supportingDocUrl: supportingDocUrl
            }
          : contribution
      );

      setFormData({
        ...formData,
        originalContributions: updatedContributions
      });
    } else {
      // Add new contribution
      const newContribution: OriginalContribution = {
        id: uuidv4(),
        contributionTitle: title,
        field: field,
        contributionDate: contributionDate,
        description: description,
        significance: significance,
        implementation: implementation,
        evidenceUrl: evidenceUrl,
        lettersUrl: lettersUrl,
        supportingDocUrl: supportingDocUrl
      };

      setFormData({
        ...formData,
        originalContributions: [...formData.originalContributions, newContribution]
      });
    }

    handleCloseDialog();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Criterion 5: Original Scientific, Scholarly, or Business-Related Contributions
        </h2>
        <p className="mt-2 text-gray-600">
          Document your original scientific, scholarly, or business-related contributions of major significance in your field.
        </p>
      </div>

      <div className="rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4">
        <p className="font-medium text-blue-800">Important</p>
        <p className="mt-1 text-sm text-blue-700">
          You must demonstrate that your contributions are both original and of major significance to your field.
        </p>
      </div>

      {formData.originalContributions.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
          <h3 className="mb-2 text-lg font-medium text-gray-900">No original contributions added yet.</h3>
          <p className="mb-4 max-w-sm text-sm text-gray-500">
            Add original scientific, scholarly, or business-related contributions that have had major significance in your field.
          </p>
          <Button 
            onClick={handleOpenDialog}
            className="flex items-center gap-2 bg-navy-800 hover:bg-navy-700"
          >
            <Plus size={16} />
            Add Original Contribution
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {formData.originalContributions.map((contribution) => (
            <Card key={contribution.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{contribution.contributionTitle}</h3>
                    <p className="text-sm text-gray-600">
                      {contribution.field} • {contribution.contributionDate}
                    </p>
                    <p className="mt-2 text-sm">{contribution.description}</p>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      {contribution.evidenceUrl && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs"
                          onClick={() => window.open(contribution.evidenceUrl, '_blank')}
                        >
                          <ExternalLink size={14} className="mr-1" />
                          View Evidence
                        </Button>
                      )}
                      {contribution.lettersUrl && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs"
                          onClick={() => window.open(contribution.lettersUrl, '_blank')}
                        >
                          <ExternalLink size={14} className="mr-1" />
                          View Support Letters
                        </Button>
                      )}
                      {contribution.supportingDocUrl && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs"
                          onClick={() => window.open(contribution.supportingDocUrl, '_blank')}
                        >
                          <ExternalLink size={14} className="mr-1" />
                          View Supporting Document
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEditContribution(contribution)}
                    >
                      <Edit size={16} />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteContribution(contribution.id)}
                    >
                      <Trash size={16} />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <div className="flex justify-center">
            <Button 
              onClick={handleOpenDialog}
              className="flex items-center gap-2 bg-navy-800 hover:bg-navy-700"
            >
              <Plus size={16} />
              Add Another Contribution
            </Button>
          </div>
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Edit Original Contribution" : "Add Original Contribution"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="title">Contribution Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter contribution title"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="field">Field</Label>
                <Input
                  id="field"
                  value={field}
                  onChange={(e) => setField(e.target.value)}
                  placeholder="Enter the field of contribution"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="contributionDate">Contribution Date</Label>
                <Input
                  id="contributionDate"
                  type="date"
                  value={contributionDate}
                  onChange={(e) => setContributionDate(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your contribution in detail"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="significance">Significance</Label>
                <Textarea
                  id="significance"
                  value={significance}
                  onChange={(e) => setSignificance(e.target.value)}
                  placeholder="Explain the significance of your contribution to the field"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="implementation">Implementation</Label>
                <Textarea
                  id="implementation"
                  value={implementation}
                  onChange={(e) => setImplementation(e.target.value)}
                  placeholder="Describe how your contribution was implemented or applied"
                  required
                />
              </div>
              
              <FileUpload
                id="evidence-url"
                label="Upload Evidence"
                hint="Upload evidence supporting your contribution (PDF, PNG, JPEG)"
                value={evidenceUrl}
                onChange={setEvidenceUrl}
                path="contributions/evidence"
              />
              
              <FileUpload
                id="letters-url"
                label="Upload Support Letters"
                hint="Upload letters supporting your contribution (PDF)"
                value={lettersUrl}
                onChange={setLettersUrl}
                path="contributions/letters"
              />
              
              <FileUpload
                id="supporting-doc-url"
                label="Upload Supporting Documents"
                hint="Upload any additional supporting documents (PDF, PNG, JPEG)"
                value={supportingDocUrl}
                onChange={setSupportingDocUrl}
                path="contributions/documents"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSaveContribution}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OriginalContributions;
