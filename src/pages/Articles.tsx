import TableSkeleton from "@/components/TableSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  type Article,
  extractTrafficValue,
  getArticles,
  getArticlesByStatus,
} from "@/data/articleData";
import { AlertCircle, ChevronDown, ChevronUp, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

type SortDirection = "asc" | "desc" | null;
type SortField = "title" | "keyword" | "words" | "createdOn" | null;

const Articles = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "generated";

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticles, setSelectedArticles] = useState<string[]>([]);

  // Sorting state
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { toast } = useToast();

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
    setCurrentPage(1); // Reset to first page when changing tabs
    setSelectedArticles([]); // Clear selected articles when changing tabs
  };

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      setError(null);
      try {
        let data: Article[];
        if (activeTab === "all") {
          data = await getArticles();
        } else {
          data = await getArticlesByStatus(activeTab as Article["status"]);
        }
        setArticles(data);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
        setError("Failed to load articles. Please try again.");
        toast({
          title: "Error",
          description: "Failed to load articles. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, [activeTab, toast]);

  const handleSelectArticle = (id: string) => {
    setSelectedArticles((prev) => {
      if (prev.includes(id)) {
        return prev.filter((articleId) => articleId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedArticles.length === paginatedArticles.length) {
      setSelectedArticles([]);
    } else {
      setSelectedArticles(paginatedArticles.map((article) => article.id));
    }
  };

  // Sorting logic
  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortField(null);
        setSortDirection(null);
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return null;
    }
    return sortDirection === "asc" ? (
      <ChevronUp className="h-4 w-4 ml-1" />
    ) : (
      <ChevronDown className="h-4 w-4 ml-1" />
    );
  };

  // Apply filtering and sorting
  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.keyword.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (!sortField || !sortDirection) return 0;

    const direction = sortDirection === "asc" ? 1 : -1;

    switch (sortField) {
      case "title":
        return a.title.localeCompare(b.title) * direction;
      case "keyword":
        // Extract the actual traffic number for comparison
        const trafficA = extractTrafficValue(a.keywordInfo);
        const trafficB = extractTrafficValue(b.keywordInfo);
        return (trafficA - trafficB) * direction;
      case "words":
        return (a.words - b.words) * direction;
      case "createdOn":
        // Simple string comparison for dates (not perfect but works for this demo)
        return a.createdOn.localeCompare(b.createdOn) * direction;
      default:
        return 0;
    }
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedArticles.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedArticles = sortedArticles.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      // Reset selected articles when changing page
      setSelectedArticles([]);
    }
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page when changing items per page
    setSelectedArticles([]); // Clear selected articles when changing items per page
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages are less than or equal to max visible pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push(-1); // -1 represents ellipsis
      }

      // Show current page and surrounding pages
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push(-1); // -1 represents ellipsis
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const handleViewArticle = (id: string) => {
    console.log(`View article ${id}`);
    toast({
      title: "Article Viewed",
      description: `You clicked on article #${id}`,
    });
  };

  const handlePublishArticle = (id: string) => {
    console.log(`Publish article ${id}`);
    toast({
      title: "Publish Requested",
      description: `Publishing article #${id}`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="w-full text-center mt-6">
        <h1 className="text-2xl md:text-3xl font-extrabold font-montserrat">
          Articles
        </h1>
        <p className="text-muted-foreground mt-2">
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

      <div>
        <Tabs
          defaultValue={activeTab}
          onValueChange={handleTabChange}
          className="w-full  "
        >
          {/* Tab Switcher wrapper */}
          <div className="flex mb-8 text-center justify-center items-center sm:justify-start w-full  pb-2">
            <TabsList className="w-full max-w-3xl mx-auto  justify-between  grid grid-cols-4 space-x-1 md:space-x-0">
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

          {["generated", "published", "scheduled", "archived"].map(
            (tabValue) => (
              <TabsContent
                key={tabValue}
                value={tabValue}
                className="space-y-5 "
              >
                <div className="flex flex-col  text-center sm:flex-row sm:items-center gap-4 ">
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
                </div>

                {loading ? (
                  <TableSkeleton />
                ) : (
                  <div className="rounded-md border shadow-sm ">
                    <div className="">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gray-50">
                            <TableHead className="w-12 pl-4">
                              <Checkbox
                                checked={
                                  selectedArticles.length ===
                                    paginatedArticles.length &&
                                  paginatedArticles.length > 0
                                }
                                onCheckedChange={handleSelectAll}
                                aria-label={
                                  selectedArticles.length ===
                                  paginatedArticles.length
                                    ? "Deselect all articles"
                                    : "Select all articles"
                                }
                              />
                            </TableHead>
                            <TableHead
                              className="min-w-[180px] cursor-pointer hover:text-foreground"
                              onClick={() => toggleSort("title")}
                            >
                              <div className="flex items-center  font-bold">
                                Article Title
                                {getSortIcon("title")}
                              </div>
                            </TableHead>
                            <TableHead
                              className="min-w-[160px] hidden sm:table-cell cursor-pointer hover:text-foreground"
                              onClick={() => toggleSort("keyword")}
                            >
                              <div className="flex items-center font-bold">
                                Keyword [Traffic]
                                {getSortIcon("keyword")}
                              </div>
                            </TableHead>
                            <TableHead
                              className="min-w-[80px] hidden md:table-cell cursor-pointer hover:text-foreground"
                              onClick={() => toggleSort("words")}
                            >
                              <div className="flex items-center font-bold">
                                Words
                                {getSortIcon("words")}
                              </div>
                            </TableHead>
                            <TableHead
                              className="min-w-[120px] hidden lg:table-cell cursor-pointer hover:text-foreground"
                              onClick={() => toggleSort("createdOn")}
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
                          {paginatedArticles.length === 0 ? (
                            <TableRow>
                              <TableCell
                                colSpan={7}
                                className="h-24 text-center"
                              >
                                No articles found.
                              </TableCell>
                            </TableRow>
                          ) : (
                            paginatedArticles.map((article) => (
                              <TableRow
                                key={article.id}
                                className="table-row-animate"
                              >
                                <TableCell className="pl-4">
                                  <Checkbox
                                    checked={selectedArticles.includes(
                                      article.id
                                    )}
                                    onCheckedChange={() =>
                                      handleSelectArticle(article.id)
                                    }
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
                                    onClick={() =>
                                      handleViewArticle(article.id)
                                    }
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
                                    onClick={() =>
                                      handlePublishArticle(article.id)
                                    }
                                    aria-label={`Publish article: ${article.title}`}
                                    className="h-8 w-8 rounded-full mx-auto flex items-center justify-center p-0"
                                  >
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
                  </div>
                )}

                <div className="flex  flex-col sm:flex-row sm:items-center sm:justify-between gap-3 overflow-hidden">
                  <div className="flex items-center space-x-2 font-medium text-sm">
                    <span className="text-sm md:flex md:items-center  hidden  text-muted-foreground">
                      <span className="mr-2">|</span> Show
                    </span>
                    <Select
                      value={String(itemsPerPage)}
                      onValueChange={handleItemsPerPageChange}
                    >
                      <SelectTrigger className="h-8 w-[70px]">
                        <SelectValue placeholder={String(itemsPerPage)} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="text-sm w-64 text-muted-foreground">
                      entries per page
                    </span>
                  </div>

                  {!loading && totalPages > 0 && (
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(currentPage - 1);
                            }}
                            aria-disabled={currentPage === 1}
                            className={
                              currentPage === 1
                                ? "pointer-events-none opacity-50"
                                : ""
                            }
                          />
                        </PaginationItem>

                        {getPageNumbers().map((pageNum, index) =>
                          pageNum === -1 ? (
                            <PaginationItem key={`ellipsis-${index}`}>
                              <span className="flex h-9 w-9 items-center justify-center">
                                ...
                              </span>
                            </PaginationItem>
                          ) : (
                            <PaginationItem key={pageNum}>
                              <PaginationLink
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handlePageChange(pageNum);
                                }}
                                isActive={pageNum === currentPage}
                              >
                                {pageNum}
                              </PaginationLink>
                            </PaginationItem>
                          )
                        )}

                        <PaginationItem>
                          <PaginationNext
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(currentPage + 1);
                            }}
                            aria-disabled={currentPage === totalPages}
                            className={
                              currentPage === totalPages
                                ? "pointer-events-none opacity-50"
                                : ""
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}

                  <div className="text-sm w-[400px] whitespace-nowrap  font-medium text-muted-foreground sm:order-first">
                    Total {filteredArticles.length} Article
                    {filteredArticles.length !== 1 ? "s" : ""}
                    &nbsp;&nbsp;|&nbsp;&nbsp; Page {currentPage} of{" "}
                    {totalPages || 1}
                  </div>
                </div>
              </TabsContent>
            )
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Articles;
