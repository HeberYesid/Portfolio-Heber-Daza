import { useState, useEffect } from 'react';
import { Newspaper, ExternalLink, RefreshCw, MessageSquare, Heart, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

// Types for our news items
interface NewsItem {
  id: string | number;
  title: string;
  url: string;
  source: 'HackerNews' | 'Dev.to';
  author?: string;
  points?: number;
  comments?: number;
  timestamp: number;
  tags?: string[];
}

const TechNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'hackernews' | 'devto'>('all');

  const fetchHackerNews = async () => {
    try {
      const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
      const ids = await response.json();
      // Get top 10 stories
      const topIds = ids.slice(0, 10);
      
      const storyPromises = topIds.map(async (id: number) => {
        const storyRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        return storyRes.json();
      });

      const stories = await Promise.all(storyPromises);
      return stories.map((story: any) => ({
        id: story.id,
        title: story.title,
        url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
        source: 'HackerNews' as const,
        author: story.by,
        points: story.score,
        comments: story.descendants,
        timestamp: story.time * 1000,
        tags: ['tech', 'news']
      }));
    } catch (error) {
      console.error('Error fetching HN:', error);
      return [];
    }
  };

  const fetchDevTo = async () => {
    try {
      // Fetch top articles from the last few days
      const response = await fetch('https://dev.to/api/articles?top=7&per_page=10');
      const articles = await response.json();
      
      return articles.map((article: any) => ({
        id: article.id,
        title: article.title,
        url: article.url,
        source: 'Dev.to' as const,
        author: article.user.name,
        points: article.positive_reactions_count,
        comments: article.comments_count,
        timestamp: new Date(article.published_at).getTime(),
        tags: article.tag_list
      }));
    } catch (error) {
      console.error('Error fetching Dev.to:', error);
      return [];
    }
  };

  const fetchAllNews = async () => {
    setLoading(true);
    const [hnNews, devToNews] = await Promise.all([fetchHackerNews(), fetchDevTo()]);
    // Interleave or just merge and sort by date? Let's sort by date/score mix or just date.
    // For now, let's just merge and sort by timestamp descending
    const allNews = [...hnNews, ...devToNews]
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 10);
    setNews(allNews);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllNews();
  }, []);

  const filteredNews = activeTab === 'all' 
    ? news 
    : news.filter(item => item.source.toLowerCase().replace('.', '') === activeTab.replace('.', ''));

  return (
    <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
            <Newspaper className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Tech News Feed</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Noticias curadas para desarrolladores</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700/50 p-1 rounded-xl">
          {(['all', 'hackernews', 'devto'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab 
                  ? 'bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-300 shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              {tab === 'all' ? 'Todo' : tab === 'hackernews' ? 'Hacker News' : 'Dev.to'}
            </button>
          ))}
        </div>

        <button 
          onClick={fetchAllNews}
          disabled={loading}
          className="p-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
          title="Actualizar noticias"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="space-y-4">
        {loading ? (
          // Skeleton loading state
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="animate-pulse flex flex-col gap-3 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="flex gap-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              </div>
            </div>
          ))
        ) : filteredNews.length > 0 ? (
          filteredNews.map((item) => (
            <article 
              key={`${item.source}-${item.id}`}
              className="group relative p-5 rounded-xl border border-gray-100 dark:border-gray-700/50 hover:border-indigo-200 dark:hover:border-indigo-800 bg-gray-50/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-md ${
                      item.source === 'HackerNews' 
                        ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
                        : 'bg-black/5 text-gray-700 dark:bg-white/10 dark:text-gray-300'
                    }`}>
                      {item.source === 'HackerNews' ? 'HN' : 'DEV'}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDistanceToNow(item.timestamp, { addSuffix: true, locale: es })}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2 line-clamp-2">
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {item.title}
                    </a>
                  </h3>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{item.points || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>{item.comments || 0}</span>
                    </div>
                    <span className="text-gray-400 dark:text-gray-600">•</span>
                    <span className="truncate max-w-[150px]">por {item.author}</span>
                  </div>
                </div>

                <ExternalLink className="w-5 h-5 text-gray-300 group-hover:text-indigo-500 transition-colors flex-shrink-0" />
              </div>
            </article>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            No se encontraron noticias. Intenta recargar.
          </div>
        )}
      </div>
    </section>
  );
};

export default TechNews;
