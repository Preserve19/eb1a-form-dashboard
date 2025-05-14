
import { useState } from 'react';
import { Plus, Edit, Trash, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useForm } from '@/contexts/FormContext';
import { PublishedMaterial } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { FileUpload } from '@/components/ui/file-upload';

const PublishedMaterials = () => {
  const { formData, setFormData } = useForm();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentMaterial, setCurrentMaterial] = useState<PublishedMaterial | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [publisher, setPublisher] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [circulation, setCirculation] = useState('');
  const [summary, setSummary] = useState('');
  const [publicationUrl, setPublicationUrl] = useState<string | undefined>(undefined);
  const [evidenceUrl, setEvidenceUrl] = useState<string | undefined>(undefined);

  const resetForm = () => {
    setTitle('');
    setPublisher('');
    setPublicationDate('');
    setCirculation('');
    setSummary('');
    setPublicationUrl(undefined);
    setEvidenceUrl(undefined);
    setCurrentMaterial(null);
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

  const handleEditMaterial = (material: PublishedMaterial) => {
    setCurrentMaterial(material);
    setTitle(material.publicationTitle);
    setPublisher(material.publisherName);
    setPublicationDate(material.publicationDate);
    setCirculation(material.circulationInfo);
    setSummary(material.contentSummary);
    setPublicationUrl(material.publicationUrl);
    setEvidenceUrl(material.evidenceUrl);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleDeleteMaterial = (id: string) => {
    setFormData({
      ...formData,
      publishedMaterials: formData.publishedMaterials.filter(material => material.id !== id)
    });
  };

  const handleSaveMaterial = () => {
    if (!title || !publisher || !publicationDate || !circulation || !summary) {
      // Show error message or validation
      return;
    }

    if (isEditMode && currentMaterial) {
      // Update existing material
      const updatedMaterials = formData.publishedMaterials.map(material => 
        material.id === currentMaterial.id 
          ? {
              ...material,
              publicationTitle: title,
              publisherName: publisher,
              publicationDate: publicationDate,
              circulationInfo: circulation,
              contentSummary: summary,
              publicationUrl: publicationUrl,
              evidenceUrl: evidenceUrl
            }
          : material
      );

      setFormData({
        ...formData,
        publishedMaterials: updatedMaterials
      });
    } else {
      // Add new material
      const newMaterial: PublishedMaterial = {
        id: uuidv4(),
        publicationTitle: title,
        publisherName: publisher,
        publicationDate: publicationDate,
        circulationInfo: circulation,
        contentSummary: summary,
        publicationUrl: publicationUrl,
        evidenceUrl: evidenceUrl
      };

      setFormData({
        ...formData,
        publishedMaterials: [...formData.publishedMaterials, newMaterial]
      });
    }

    handleCloseDialog();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Criterion 3: Published Material About You
        </h2>
        <p className="mt-2 text-gray-600">
          Document published material in professional or major trade publications or major media about you and your work.
        </p>
      </div>

      <div className="rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4">
        <p className="font-medium text-blue-800">Important</p>
        <p className="mt-1 text-sm text-blue-700">
          The material must be about you and your work, not authored by you. It should appear in professional publications or major media.
        </p>
      </div>

      {formData.publishedMaterials.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
          <h3 className="mb-2 text-lg font-medium text-gray-900">No published materials added yet.</h3>
          <p className="mb-4 max-w-sm text-sm text-gray-500">
            Add published materials from professional publications or major media about you and your work.
          </p>
          <Button 
            onClick={handleOpenDialog}
            className="flex items-center gap-2 bg-navy-800 hover:bg-navy-700"
          >
            <Plus size={16} />
            Add Published Material
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {formData.publishedMaterials.map((material) => (
            <Card key={material.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{material.publicationTitle}</h3>
                    <p className="text-sm text-gray-600">
                      {material.publisherName} • {material.publicationDate}
                    </p>
                    <p className="mt-2 text-sm">{material.contentSummary}</p>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      {material.publicationUrl && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs"
                          onClick={() => window.open(material.publicationUrl, '_blank')}
                        >
                          <ExternalLink size={14} className="mr-1" />
                          View Publication
                        </Button>
                      )}
                      {material.evidenceUrl && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs"
                          onClick={() => window.open(material.evidenceUrl, '_blank')}
                        >
                          <ExternalLink size={14} className="mr-1" />
                          View Evidence
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEditMaterial(material)}
                    >
                      <Edit size={16} />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteMaterial(material.id)}
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
              Add Another Published Material
            </Button>
          </div>
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Edit Published Material" : "Add Published Material"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="title">Publication Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter publication title"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="publisher">Publisher Name</Label>
                <Input
                  id="publisher"
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
                  placeholder="Enter publisher name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="publicationDate">Publication Date</Label>
                <Input
                  id="publicationDate"
                  type="date"
                  value={publicationDate}
                  onChange={(e) => setPublicationDate(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="circulation">Circulation Information</Label>
                <Textarea
                  id="circulation"
                  value={circulation}
                  onChange={(e) => setCirculation(e.target.value)}
                  placeholder="Describe circulation details of the publication"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="summary">Content Summary</Label>
                <Textarea
                  id="summary"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Summarize what the publication says about you"
                  required
                />
              </div>
              
              <FileUpload
                id="publication-url"
                label="Upload Publication"
                hint="Upload a copy of the publication (PDF, PNG, JPEG)"
                value={publicationUrl}
                onChange={setPublicationUrl}
                path="publications"
              />
              
              <FileUpload
                id="evidence-url"
                label="Upload Additional Evidence"
                hint="Upload any supporting evidence (PDF, PNG, JPEG)"
                value={evidenceUrl}
                onChange={setEvidenceUrl}
                path="evidence"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSaveMaterial}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PublishedMaterials;
