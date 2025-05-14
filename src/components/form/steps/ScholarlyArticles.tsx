
import { useState } from 'react';
import { Plus, Edit, Trash, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useForm } from '@/contexts/FormContext';
import { ScholarlyArticle } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { FileUpload } from '@/components/ui/file-upload';

const ScholarlyArticles = () => {
  const { formData, setFormData } = useForm();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<ScholarlyArticle | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [journal, setJournal] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [authors, setAuthors] = useState('');
  const [abstract, setAbstract] = useState('');
  const [journalImpact, setJournalImpact] = useState('');
  const [significance, setSignificance] = useState('');
  const [articleUrl, setArticleUrl] = useState<string | undefined>(undefined);
  const [citationUrl, setCitationUrl] = useState<string | undefined>(undefined);
  const [journalInfoUrl, setJournalInfoUrl] = useState<string | undefined>(undefined);

  const resetForm = () => {
    setTitle('');
    setJournal('');
    setPublicationDate('');
    setAuthors('');
    setAbstract('');
    setJournalImpact('');
    setSignificance('');
    setArticleUrl(undefined);
    setCitationUrl(undefined);
    setJournalInfoUrl(undefined);
    setCurrentArticle(null);
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

  const handleEditArticle = (article: ScholarlyArticle) => {
    setCurrentArticle(article);
    setTitle(article.articleTitle);
    setJournal(article.journalName);
    setPublicationDate(article.publicationDate);
    setAuthors(article.authors);
    setAbstract(article.abstract);
    setJournalImpact(article.journalImpact);
    setSignificance(article.significance);
    setArticleUrl(article.articleUrl);
    setCitationUrl(article.citationUrl);
    setJournalInfoUrl(article.journalInfoUrl);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleDeleteArticle = (id: string) => {
    setFormData({
      ...formData,
      scholarlyArticles: formData.scholarlyArticles.filter(article => article.id !== id)
    });
  };

  const handleSaveArticle = () => {
    if (!title || !journal || !publicationDate || !authors || !abstract) {
      // Show error message or validation
      return;
    }

    if (isEditMode && currentArticle) {
      // Update existing article
      const updatedArticles = formData.scholarlyArticles.map(article => 
        article.id === currentArticle.id 
          ? {
              ...article,
              articleTitle: title,
              journalName: journal,
              publicationDate: publicationDate,
              authors: authors,
              abstract: abstract,
              journalImpact: journalImpact,
              significance: significance,
              articleUrl: articleUrl,
              citationUrl: citationUrl,
              journalInfoUrl: journalInfoUrl
            }
          : article
      );

      setFormData({
        ...formData,
        scholarlyArticles: updatedArticles
      });
    } else {
      // Add new article
      const newArticle: ScholarlyArticle = {
        id: uuidv4(),
        articleTitle: title,
        journalName: journal,
        publicationDate: publicationDate,
        authors: authors,
        abstract: abstract,
        journalImpact: journalImpact,
        significance: significance,
        articleUrl: articleUrl,
        citationUrl: citationUrl,
        journalInfoUrl: journalInfoUrl
      };

      setFormData({
        ...formData,
        scholarlyArticles: [...formData.scholarlyArticles, newArticle]
      });
    }

    handleCloseDialog();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Criterion 6: Scholarly Articles in Professional Journals
        </h2>
        <p className="mt-2 text-gray-600">
          Document your authorship of scholarly articles in professional journals or other major media.
        </p>
      </div>

      <div className="rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4">
        <p className="font-medium text-blue-800">Important</p>
        <p className="mt-1 text-sm text-blue-700">
          Your articles must be published in professional journals or other major media with international circulation.
        </p>
      </div>

      {formData.scholarlyArticles.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
          <h3 className="mb-2 text-lg font-medium text-gray-900">No scholarly articles added yet.</h3>
          <p className="mb-4 max-w-sm text-sm text-gray-500">
            Add scholarly articles you've authored in professional journals or other major media.
          </p>
          <Button 
            onClick={handleOpenDialog}
            className="flex items-center gap-2 bg-navy-800 hover:bg-navy-700"
          >
            <Plus size={16} />
            Add Scholarly Article
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {formData.scholarlyArticles.map((article) => (
            <Card key={article.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{article.articleTitle}</h3>
                    <p className="text-sm text-gray-600">
                      {article.journalName} • {article.publicationDate}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">Authors: {article.authors}</p>
                    <p className="mt-2 text-sm">{article.abstract}</p>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      {article.articleUrl && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs"
                          onClick={() => window.open(article.articleUrl, '_blank')}
                        >
                          <ExternalLink size={14} className="mr-1" />
                          View Article
                        </Button>
                      )}
                      {article.citationUrl && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs"
                          onClick={() => window.open(article.citationUrl, '_blank')}
                        >
                          <ExternalLink size={14} className="mr-1" />
                          View Citations
                        </Button>
                      )}
                      {article.journalInfoUrl && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs"
                          onClick={() => window.open(article.journalInfoUrl, '_blank')}
                        >
                          <ExternalLink size={14} className="mr-1" />
                          Journal Information
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEditArticle(article)}
                    >
                      <Edit size={16} />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteArticle(article.id)}
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
              Add Another Scholarly Article
            </Button>
          </div>
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Edit Scholarly Article" : "Add Scholarly Article"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="title">Article Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter article title"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="journal">Journal Name</Label>
                <Input
                  id="journal"
                  value={journal}
                  onChange={(e) => setJournal(e.target.value)}
                  placeholder="Enter journal name"
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
                <Label htmlFor="authors">Authors</Label>
                <Input
                  id="authors"
                  value={authors}
                  onChange={(e) => setAuthors(e.target.value)}
                  placeholder="List all authors (e.g. Smith, J., Jones, M.)"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="abstract">Abstract</Label>
                <Textarea
                  id="abstract"
                  value={abstract}
                  onChange={(e) => setAbstract(e.target.value)}
                  placeholder="Provide article abstract or summary"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="journalImpact">Journal Impact</Label>
                <Textarea
                  id="journalImpact"
                  value={journalImpact}
                  onChange={(e) => setJournalImpact(e.target.value)}
                  placeholder="Describe the journal's impact factor, circulation, or prestige"
                />
              </div>
              
              <div>
                <Label htmlFor="significance">Significance</Label>
                <Textarea
                  id="significance"
                  value={significance}
                  onChange={(e) => setSignificance(e.target.value)}
                  placeholder="Explain the significance of this article to your field"
                />
              </div>
              
              <FileUpload
                id="article-url"
                label="Upload Article"
                hint="Upload the full article (PDF)"
                value={articleUrl}
                onChange={setArticleUrl}
                path="articles/full"
              />
              
              <FileUpload
                id="citation-url"
                label="Upload Citation Evidence"
                hint="Upload evidence of citations (PDF, PNG, JPEG)"
                value={citationUrl}
                onChange={setCitationUrl}
                path="articles/citations"
              />
              
              <FileUpload
                id="journal-info-url"
                label="Upload Journal Information"
                hint="Upload information about the journal (PDF, PNG, JPEG)"
                value={journalInfoUrl}
                onChange={setJournalInfoUrl}
                path="articles/journals"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSaveArticle}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScholarlyArticles;
