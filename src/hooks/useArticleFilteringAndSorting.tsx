import { extractTrafficValue, type Article } from "@/data/articleData";
import type { SortDirection, SortField } from "@/lib/types";
import { useMemo } from "react";

const useArticleFiltersAndSorting = (
  articles: Article[],
  searchQuery: string,
  sortField: SortField,
  sortDirection: SortDirection
) => {
  const filteredArticles = useMemo(() => {
    if (!searchQuery) {
      return articles;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return articles.filter(
      (article) =>
        article.title.toLowerCase().includes(lowerCaseQuery) ||
        article.keyword.toLowerCase().includes(lowerCaseQuery)
    );
  }, [articles, searchQuery]);

  const sortedArticles = useMemo(() => {
    if (!sortField || !sortDirection) {
      return filteredArticles;
    }

    const direction = sortDirection === "asc" ? 1 : -1;
    const sortableArticles = [...filteredArticles]; // Create a copy to avoid mutating state

    sortableArticles.sort((a, b) => {
      switch (sortField) {
        case "title":
          return a.title.localeCompare(b.title) * direction;
        case "keyword":
          const trafficA = extractTrafficValue(a.keywordInfo);
          const trafficB = extractTrafficValue(b.keywordInfo);
          return (trafficA - trafficB) * direction;
        case "words":
          return (a.words - b.words) * direction;
        case "createdOn":
          // Use Date objects for proper comparison
          //   const dateA = new Date(a.createdOn).getTime();
          //   const dateB = new Date(b.createdOn).getTime();
          return a.createdOn.localeCompare(b.createdOn) * direction;
        default:
          return 0;
      }
    });

    return sortableArticles;
  }, [filteredArticles, sortField, sortDirection]);

  return sortedArticles;
};

export default useArticleFiltersAndSorting;
