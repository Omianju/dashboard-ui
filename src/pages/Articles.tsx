import ArticlePaginationControls from "@/components/ArticlePaginationControls";
import ArticleTable from "@/components/ArticleTable";
import TableSkeleton from "@/components/TableSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  type Article,
  getArticles,
  getArticlesByStatus,
} from "@/data/articleData";
import useArticleFiltersAndSorting from "@/hooks/useArticleFilteringAndSorting";
import usePagination from "@/hooks/usePagination";
import type { SortDirection, SortField } from "@/lib/types";
import { AlertCircle, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Articles = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // Ensure activeTab is a valid ArticleStatus or default to "generated"
  const activeTab =
    (searchParams.get("tab") as Article["status"] | null) || "generated";

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticles, setSelectedArticles] = useState<string[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Sorting state
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const { toast } = useToast();

  // --- Data Fetching Effect ---
  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      setError(null);
      setSelectedArticles([]); // Clear selection on tab change
      try {
        let data: Article[];
        if (activeTab === "all") {
          data = await getArticles();
        } else {
          data = await getArticlesByStatus(activeTab);
        }
        setArticles(data);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
        const errorMessage = "Failed to load articles. Please try again.";
        setError(errorMessage);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, [activeTab, toast]); // Depend on activeTab and toast

  const handleTabChange = (value: string) => {
    // Ensure the value is a valid tab value before setting
    const validTabs = [
      "generated",
      "published",
      "scheduled",
      "archived",
      "all",
    ]; // Include 'all' if it's a tab
    if (validTabs.includes(value)) {
      setSearchParams({ tab: value });
      // Resetting page and selection is handled by effects triggered by tab change
    } else {
      console.warn(`Attempted to set invalid tab: ${value}`);
      // Optionally set to a default valid tab
      setSearchParams({ tab: "generated" });
    }
  };

  // --- Filtering and Sorting Logic (via Hook) ---
  const sortedFilteredArticles = useArticleFiltersAndSorting(
    articles,
    searchQuery,
    sortField,
    sortDirection
  );

  // --- Pagination Logic (via Hook) ---
  const {
    currentPage,
    totalPages,
    paginatedData: paginatedArticles,
    handlePageChange,
    totalItems: totalFilteredItems,
    getPageNumbers,
  } = usePagination(sortedFilteredArticles, itemsPerPage);

  // --- Selection Handlers ---
  const handleSelectArticle = (id: string) => {
    setSelectedArticles((prev) =>
      prev.includes(id)
        ? prev.filter((articleId) => articleId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const allVisibleArticleIds = paginatedArticles.map((article) => article.id);
    // If all visible are currently selected, deselect them. Otherwise, select all visible.
    const areAllVisibleSelected = allVisibleArticleIds.every((id) =>
      selectedArticles.includes(id)
    );

    setSelectedArticles((prevSelected) => {
      if (areAllVisibleSelected) {
        // Deselect only the articles on the current page
        return prevSelected.filter((id) => !allVisibleArticleIds.includes(id));
      } else {
        // Add all visible articles to the selection
        const newSelected = new Set(prevSelected);
        allVisibleArticleIds.forEach((id) => newSelected.add(id));
        return Array.from(newSelected);
      }
    });
  };

  // Check if all currently *visible* articles are selected
  const isAllVisibleSelected =
    paginatedArticles.length > 0 &&
    paginatedArticles.every((article) => selectedArticles.includes(article.id));

  // --- Sorting Handlers ---
  const toggleSort = (field: SortField) => {
    setSortField((prevField) => {
      if (prevField === field) {
        // Cycle: asc -> desc -> null
        setSortDirection((prevDirection) =>
          prevDirection === "asc" ? "desc" : null
        );
        return sortDirection === "desc" ? null : field;
      } else {
        // New field, start with asc
        setSortDirection("asc");
        return field;
      }
    });
  };

  // --- Pagination & Items Per Page Handlers ---
  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    // handlePageChange(1); // handlePageChange is called by usePagination useEffect
    setSelectedArticles([]); // Clear selected articles when changing items per page
  };

  const handlePaginationPageChange = (page: number) => {
    handlePageChange(page);
    setSelectedArticles([]); // Clear selected articles when changing page
  };

  // --- Action Handlers ---
  const handleViewArticle = (id: string) => {
    console.log(`View article ${id}`);
    toast({
      title: "Article Viewed",
      description: `You clicked on article #${id}`,
    });
    // Implement actual view logic (e.g., navigate to detail page)
  };

  const handlePublishArticle = (id: string) => {
    console.log(`Publish article ${id}`);
    toast({
      title: "Publish Requested",
      description: `Publishing article #${id}`,
    });
    // Implement actual publish logic (e.g., API call)
  };

  return (
    <div className="space-y-6 p-6">
      <div className="text-center ">
        <h2 className="text-2xl font-extrabold md:text-3xl mb-1.5">
          Articles
        </h2>
        <p className="text-muted-foreground">
          Manage and monitor all your article content
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        {/* Tab Switcher wrapper */}
        <div className="flex mb-8 text-center justify-center items-center sm:justify-start w-full pb-2">
          <TabsList className="w-full max-w-3xl mx-auto justify-between grid grid-cols-4 space-x-1 md:space-x-0">
            <TabsTrigger
              value="generated"
              className="rounded-xl text-xs font-semibold px-3 py-2"
            >
              Generated <span className="hidden md:block ml-1">Articles</span>
            </TabsTrigger>
            <TabsTrigger
              value="published"
              className="rounded-xl text-xs font-semibold px-3 py-2"
            >
              Published <span className="hidden md:block ml-1">Articles</span>
            </TabsTrigger>
            <TabsTrigger
              value="scheduled"
              className="rounded-xl text-xs font-semibold px-3 py-2"
            >
              Scheduled <span className="hidden md:block ml-1">Articles</span>
            </TabsTrigger>
            <TabsTrigger
              value="archived"
              className="rounded-xl text-xs font-semibold px-3 py-2"
            >
              Archived <span className="hidden md:block ml-1">Articles</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Using a single TabsContent that renders different content based on the tab and state */}
        {/* This avoids rendering 4 identical content blocks */}
        <TabsContent value={activeTab} className="space-y-5">
          <div className="flex flex-col text-center sm:flex-row sm:items-center gap-4 ">
            <div className="relative flex-1 max-w-sm mx-auto mb-5 mt-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for Title & Keywords..."
                className="pl-8 text-xs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search articles"
              />
            </div>
            {/* Add any bulk actions here, e.g., Publish Selected Button */}
            {/* {selectedArticles.length > 0 && (
                 <Button variant="outline">Publish Selected ({selectedArticles.length})</Button>
             )} */}
          </div>

          {loading ? (
            <TableSkeleton />
          ) : (
            <ArticleTable
              articles={paginatedArticles}
              selectedArticles={selectedArticles}
              onSelectArticle={handleSelectArticle}
              onSelectAll={handleSelectAll}
              onViewArticle={handleViewArticle}
              onPublishArticle={handlePublishArticle}
              sortField={sortField}
              sortDirection={sortDirection}
              onToggleSort={toggleSort}
              isAllSelected={isAllVisibleSelected}
            />
          )}

          {!loading &&
            sortedFilteredArticles.length > 0 && ( // Only show pagination if there are items to paginate
              <ArticlePaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePaginationPageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
                totalItems={totalFilteredItems}
                getPageNumbers={getPageNumbers}
              />
            )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Articles;
