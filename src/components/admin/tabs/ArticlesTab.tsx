
import React from 'react';
import EntryCardList, { EntryCard } from '@/components/admin/EntryCardList';

interface ArticlesTabProps {
  articles: any[];
}

const ArticlesTab: React.FC<ArticlesTabProps> = ({ articles = [] }) => {
  return (
    <EntryCardList 
      title="Scholarly Articles"
      entries={articles}
      renderEntry={(article) => (
        <EntryCard 
          key={article.id}
          title={article.articleTitle}
          subtitle={`${article.journalName} • ${article.publicationDate}`}
          fields={[
            { label: "Article Title", value: article.articleTitle },
            { label: "Journal Name", value: article.journalName },
            { label: "Publication Date", value: article.publicationDate },
            { label: "Abstract", value: article.abstract }
          ]}
          links={[
            ...(article.articleUrl ? [{ url: article.articleUrl, label: 'Full Article' }] : []),
            ...(article.citationUrl ? [{ url: article.citationUrl, label: 'Citation Evidence' }] : [])
          ]}
        />
      )}
    />
  );
};

export default ArticlesTab;
