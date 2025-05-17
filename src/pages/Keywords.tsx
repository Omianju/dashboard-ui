
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Keywords = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const dummyKeywords = [
    { id: "1", keyword: "SEO best practices", volume: 12500, difficulty: "Medium", cpc: 1.25 },
    { id: "2", keyword: "Content marketing", volume: 8700, difficulty: "Low", cpc: 2.15 },
    { id: "3", keyword: "Digital marketing strategy", volume: 9300, difficulty: "High", cpc: 4.50 },
    { id: "4", keyword: "Social media engagement", volume: 7200, difficulty: "Medium", cpc: 1.80 },
    { id: "5", keyword: "Email marketing tips", volume: 6100, difficulty: "Low", cpc: 1.35 },
  ];

  const filteredKeywords = dummyKeywords.filter(kw => 
    kw.keyword.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Keywords</h1>
        <p className="text-muted-foreground mt-2">
          Research and manage your SEO keywords
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search keywords..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search keywords"
          />
        </div>
        <Button>Add Keyword</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredKeywords.map(kw => (
          <Card key={kw.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{kw.keyword}</CardTitle>
              <CardDescription>Difficulty: {kw.difficulty}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Search Volume</p>
                  <p className="font-medium">{kw.volume.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">CPC</p>
                  <p className="font-medium">${kw.cpc.toFixed(2)}</p>
                </div>
                <Button variant="outline" size="sm">Analyze</Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredKeywords.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="pt-6 text-center">
              <p>No keywords found matching your search.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Keywords;
