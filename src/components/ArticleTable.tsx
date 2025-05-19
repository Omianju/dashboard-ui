import type { Article } from "@/data/articleData";
import type { SortDirection, SortField } from "@/lib/types";
import { ChevronDown, ChevronUp, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface ArticleTableProps {
  articles: Article[];
  selectedArticles: string[];
  onSelectArticle: (id: string) => void;
  onSelectAll: () => void;
  onViewArticle: (id: string) => void;
  onPublishArticle: (id: string) => void;
  sortField: SortField;
  sortDirection: SortDirection;
  onToggleSort: (field: SortField) => void;
  isAllSelected: boolean;
}

const ArticleTable: React.FC<ArticleTableProps> = ({
  articles,
  selectedArticles,
  onSelectArticle,
  onSelectAll,
  onViewArticle,
  onPublishArticle,
  sortField,
  sortDirection,
  onToggleSort,
  isAllSelected,
}) => {
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return null;
    }
    return sortDirection === "asc" ? (
      <ChevronUp className="ml-1 h-3 w-3" />
    ) : (
      <ChevronDown className="ml-1 h-3 w-3" />
    );
  };

  return (
    <div className="rounded-md border shadow-sm ">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="w-12 pl-4">
              <Checkbox
                checked={isAllSelected}
                onCheckedChange={onSelectAll}
                aria-label={
                  isAllSelected
                    ? "Deselect all visible articles"
                    : "Select all visible articles"
                }
              />
            </TableHead>
            <TableHead
              className="min-w-[180px] cursor-pointer hover:text-foreground"
              onClick={() => onToggleSort("title")}
            >
              <div className="flex items-center font-bold">
                Article Title
                {getSortIcon("title")}
              </div>
            </TableHead>
            <TableHead
              className="min-w-[160px] hidden sm:table-cell cursor-pointer hover:text-foreground"
              onClick={() => onToggleSort("keyword")}
            >
              <div className="flex items-center font-bold">
                Keyword [Traffic]
                {getSortIcon("keyword")}
              </div>
            </TableHead>
            <TableHead
              className="min-w-[80px] hidden md:table-cell cursor-pointer hover:text-foreground"
              onClick={() => onToggleSort("words")}
            >
              <div className="flex items-center font-bold">
                Words
                {getSortIcon("words")}
              </div>
            </TableHead>
            <TableHead
              className="min-w-[120px] hidden lg:table-cell cursor-pointer hover:text-foreground"
              onClick={() => onToggleSort("createdOn")}
            >
              <div className="flex items-center font-bold">
                Created On
                {getSortIcon("createdOn")}
              </div>
            </TableHead>
            <TableHead className="w-[100px] text-center font-bold">
              Action
            </TableHead>
            <TableHead className="w-[100px] text-center font-bold">
              Publish
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No articles found.
              </TableCell>
            </TableRow>
          ) : (
            articles.map((article) => (
              <TableRow key={article.id}>
                <TableCell className="pl-4">
                  <Checkbox
                    checked={selectedArticles.includes(article.id)}
                    onCheckedChange={() => onSelectArticle(article.id)}
                    aria-label={`Select article: ${article.title}`}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <div>
                    <p className="truncate max-w-[200px] sm:max-w-full">
                      {article.title}
                    </p>
                    <p className="text-sm text-muted-foreground sm:hidden truncate">
                      {article.keyword} {article.keywordInfo}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground hidden sm:table-cell">
                  {article.keyword} {article.keywordInfo}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {article.words}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {article.createdOn}
                </TableCell>
                <TableCell className="text-center p-0">
                  <Button
                    variant="view"
                    size="sm"
                    onClick={() => onViewArticle(article.id)}
                    aria-label={`View article: ${article.title}`}
                    className="h-8 px-5 rounded-md"
                  >
                    <span>View</span>
                  </Button>
                </TableCell>
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="wordpress"
                        onClick={() => onPublishArticle(article.id)}
                        aria-label={`Publish article: ${article.title}`}
                        className="h-8 w-8 rounded-full mx-auto flex items-center justify-center p-0"
                      >
                        {/* WordPress Icon SVG */}
                        <Globe />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Publish to the world</p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ArticleTable;
