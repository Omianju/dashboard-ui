
export interface Article {
  id: string;
  title: string;
  keyword: string;
  keywordInfo: string;
  words: number;
  createdOn: string;
  status: "published" | "generated" | "scheduled" | "archived" | "all";
}

export const articlesData: Article[] = [
  {
    id: "1",
    title: "How to Improve Your Skills in League of Legends",
    keyword: "league of legends",
    keywordInfo: "[2240000]",
    words: 4575,
    createdOn: "20 hours ago",
    status: "generated"
  },
  {
    id: "2",
    title: "How to Master Last Hitting in League of Legends",
    keyword: "league of legends",
    keywordInfo: "[2240000]",
    words: 3480,
    createdOn: "21 hours ago",
    status: "generated"
  },
  {
    id: "3",
    title: "7 Tips for Better Teamplay in League of Legends",
    keyword: "league of legends",
    keywordInfo: "[2240000]",
    words: 2676,
    createdOn: "a day ago",
    status: "generated"
  },
  {
    id: "4",
    title: "Top Virtual Executive Assistant Services (2024)",
    keyword: "virtual executive assistant",
    keywordInfo: "[2900]",
    words: 2408,
    createdOn: "1 Oct, 24",
    status: "generated"
  },
  {
    id: "5",
    title: "Unlimited Graphics Design Solutions",
    keyword: "unlimited graphic design services",
    keywordInfo: "[390]",
    words: 1793,
    createdOn: "—",
    status: "generated"
  },
  {
    id: "6",
    title: "Top Amazon Payment Methods for Quick Access to Funds",
    keyword: "amazon payment methods",
    keywordInfo: "[5600]",
    words: 2647,
    createdOn: "—",
    status: "generated"
  },
  {
    id: "7",
    title: "Backlinks 101: What are backlinks and why they're important [Free template]",
    keyword: "backlinks",
    keywordInfo: "[8100]",
    words: 2261,
    createdOn: "—",
    status: "generated"
  },
  {
    id: "8",
    title: "7 Leading AI SEO Tools in 2024 (Ranked & Compared)",
    keyword: "ai seo software",
    keywordInfo: "[880]",
    words: 1543,
    createdOn: "—",
    status: "generated"
  },
  {
    id: "9",
    title: "Unlimited Graphic Design Services You Can Rely On",
    keyword: "unlimited graphic design services",
    keywordInfo: "[390]",
    words: 1874,
    createdOn: "—",
    status: "generated"
  },
  // Additional dummy data for pagination testing
  {
    id: "10",
    title: "Best Practices for Remote Team Management",
    keyword: "remote team management",
    keywordInfo: "[3600]",
    words: 3120,
    createdOn: "2 days ago",
    status: "generated"
  },
  {
    id: "11",
    title: "How to Optimize Your Website for Mobile",
    keyword: "mobile optimization",
    keywordInfo: "[9400]",
    words: 2890,
    createdOn: "3 days ago",
    status: "published"
  },
  {
    id: "12",
    title: "10 Content Marketing Strategies That Actually Work",
    keyword: "content marketing strategies",
    keywordInfo: "[12000]",
    words: 3562,
    createdOn: "4 days ago",
    status: "published"
  },
  {
    id: "13",
    title: "Guide to Email Marketing Automation",
    keyword: "email marketing automation",
    keywordInfo: "[8200]",
    words: 2785,
    createdOn: "5 days ago",
    status: "published"
  },
  {
    id: "14",
    title: "Social Media Analytics: Measuring Your Success",
    keyword: "social media analytics",
    keywordInfo: "[6700]",
    words: 3150,
    createdOn: "1 week ago",
    status: "published"
  },
  {
    id: "15",
    title: "The Ultimate Guide to Video Marketing in 2024",
    keyword: "video marketing guide",
    keywordInfo: "[5500]",
    words: 4210,
    createdOn: "10 days ago",
    status: "scheduled"
  },
  {
    id: "16",
    title: "How to Create a Successful Podcast from Scratch",
    keyword: "create podcast",
    keywordInfo: "[7300]",
    words: 3875,
    createdOn: "2 weeks ago",
    status: "scheduled"
  },
  {
    id: "17",
    title: "E-commerce SEO Best Practices for Higher Conversion",
    keyword: "ecommerce seo",
    keywordInfo: "[14200]",
    words: 4120,
    createdOn: "15 days ago",
    status: "scheduled"
  },
  {
    id: "18",
    title: "Influencer Marketing: Finding the Right Partners",
    keyword: "influencer marketing partners",
    keywordInfo: "[3100]",
    words: 2970,
    createdOn: "3 weeks ago",
    status: "archived"
  },
  {
    id: "19",
    title: "How to Conduct Effective Keyword Research",
    keyword: "keyword research",
    keywordInfo: "[18500]",
    words: 3450,
    createdOn: "1 month ago",
    status: "archived"
  },
  {
    id: "20",
    title: "Building a Brand Identity That Stands Out",
    keyword: "brand identity",
    keywordInfo: "[12300]",
    words: 3780,
    createdOn: "1 month ago", 
    status: "archived"
  }
];

export const getArticles = (): Promise<Article[]> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      resolve(articlesData);
    }, 1000);
  });
};

export const getArticlesByStatus = (status: Article['status']): Promise<Article[]> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      resolve(articlesData.filter(article => article.status === status));
    }, 1000);
  });
};

// Helper function to extract numeric traffic value from keywordInfo string
export const extractTrafficValue = (keywordInfo: string): number => {
  const match = keywordInfo.match(/\[(\d+)\]/);
  return match ? parseInt(match[1], 10) : 0;
};
