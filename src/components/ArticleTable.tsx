import type { Article } from "@/data/articleData";
import type { SortDirection, SortField } from "@/lib/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";

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
                  <Button
                    size="icon"
                    variant="wordpress"
                    onClick={() => onPublishArticle(article.id)}
                    aria-label={`Publish article: ${article.title}`}
                    className="h-8 w-8 rounded-full mx-auto flex items-center justify-center p-0"
                  >
                    {/* WordPress Icon SVG */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM3.36 12C3.36 10.154 3.98 8.40625 5.0475 7H5.625L5.7875 7.23125C6.3 8.175 7.10625 9.33125 7.10625 9.33125C7.9375 8.3 9.08125 7.46875 10.4437 6.99375C11.7687 6.53125 13.2125 6.43125 14.5937 6.69375C15.425 6.85 16.2375 7.15 16.9687 7.59375C16.9812 7.5875 17.2438 7.7625 17.2438 7.7625L17.8313 7.16875L18.1063 7.525L18.1312 7.80625C17.775 8.28125 17.3063 8.9625 17.1125 9.35C17.1125 9.35 17.0562 9.4875 17 9.61875C17.5937 10.925 17.775 12.35 17.5125 13.8188C17.425 14.2875 17.3125 14.75 17.175 15.2C16.9562 15.9188 16.6375 16.6125 16.2188 17.25L15.6187 16.9812C15.4875 16.9187 15.0063 16.3313 15.0063 16.3313C14.1813 17.3687 13.0375 18.2 11.675 18.675C10.35 19.1375 8.90625 19.2375 7.525 18.975C6.45 18.7813 5.45625 18.3688 4.6 17.75L5.04375 16.7687L5.3 16.6C6.54375 16.075 7.4 15.8188 7.4 15.8188C6.04375 15.1875 4.98125 14.175 4.3375 12.9C3.70625 11.6812 3.5375 10.2875 3.83125 8.95625C3.44375 9.8875 3.26875 10.8937 3.3625 11.9063V12H3.36ZM11.9563 8.53125C11.8125 8.54375 11.6 8.5875 11.35 8.65C10.4625 8.8875 9.7375 9.45625 9.3875 9.8625C9.3875 9.8625 8.625 11.1625 8.625 12.85C8.625 14.5375 9.35 15.5312 9.35 15.5312C9.51875 15.7875 9.79375 16.0375 10.0875 16.2187C10.375 16.4 10.7812 16.5812 11.2 16.5812C11.6312 16.5938 11.8563 16.4625 12.0062 16.3313C12.1625 16.1875 12.2688 15.9625 12.2688 15.1688V15.1625C12.2688 14.6687 12.1562 13.625 12.1125 12.9937C12.1 12.7375 12.0875 12.5437 12.075 12.4187L12.0688 12.3C12.0688 12.3 12.0062 11.9812 11.9187 11.775C11.8188 11.5812 11.7125 11.4312 11.5688 11.35L11.5375 11.35L11.5063 11.35C11.4313 11.35 11.3188 11.425 11.2313 11.5062C11.1188 11.6125 11.025 11.7625 10.95 11.8875L10.8625 12.075L10.6813 11.9125L10.625 11.4375V10.8688C10.625 10.8688 11.0313 10.4 11.4563 10.2313C11.8812 10.0625 12.3125 10.0313 12.3125 10.0313C13.075 10.0313 13.675 10.325 14.0875 10.6938C14.4875 11.0625 14.7313 11.5625 14.8625 11.9625C15.125 12.7563 15.0875 13.4313 15.0875 13.4313C15.0875 14.9125 14.5 15.8188 13.9938 16.3313C13.4875 16.8437 12.9125 17.05 12.6 17.1375C12.5563 17.1437 12.5125 17.15 12.475 17.1562H12.4625C12.0688 17.2 11.675 17.0437 11.425 16.85C11.175 16.6563 11.0687 16.4375 10.9563 16.225L10.9 16.15L11.0125 16L11.2375 15.9187C11.2375 15.9187 11.5125 15.85 11.675 15.7375C11.7625 15.6687 11.8063 15.6062 11.825 15.5625C11.8313 15.55 11.8437 15.5188 11.8437 15.4375V14.4688L11.6312 14.3562L11.4625 14.4063C11.325 14.4688 11.2062 14.5375 11.1188 14.5875C11.0188 14.6437 10.9563 14.6813 10.9563 14.6813C10.6188 14.8063 10.2375 14.8188 9.95 14.7C9.65625 14.5875 9.40625 14.35 9.25625 14.1313C8.95 13.6875 8.84375 13.05 8.9125 12.275C8.9875 11.5 9.35 10.75 9.75 10.3188C9.75 10.3188 10.05 9.9125 10.7 9.6C11.35 9.2875 12.275 9.2625 12.275 9.2625C12.975 9.2625 13.4563 9.43125 13.85 9.63125C14.2375 9.825 14.4625 10.025 14.7 10.3C14.9375 10.575 15.0875 10.8438 15.2 11.0625C15.2562 11.1625 15.3 11.2625 15.3375 11.3437L15.375 11.4313V11.5188L15.35 11.6062C15.2188 11.8125 15.1812 11.8375 15.05 11.9C14.9187 11.9625 14.7125 12 14.7125 12L13.875 12.0062V13.0938H17.0375L17.125 13.1062C17.125 13.1062 17.1625 12.3813 17.0125 11.5687C16.9375 11.125 16.8 10.65 16.55 10.2062C16.3 9.76875 15.9437 9.3 15.4563 8.90625C14.9687 8.51875 14.1875 8.0875 13.0688 7.97C13.0688 7.97 12.5875 7.9 12.0125 7.9875C11.9875 7.9875 11.6687 8.0125 11.9563 8.53125Z" />
                    </svg>
                  </Button>
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
