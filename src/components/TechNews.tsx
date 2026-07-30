import { useState, useEffect } from 'react';
import { Newspaper, ExternalLink, Loader2 } from 'lucide-react';

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: { name: string };
}

const CACHE_KEY = 'technews_cache';
const CACHE_TTL = 30 * 60 * 1000;

interface CacheEntry {
  articles: Article[];
  timestamp: number;
}

const readCache = (): CacheEntry | null => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CacheEntry;
  } catch {
    return null;
  }
};

const writeCache = (articles: Article[]) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ articles, timestamp: Date.now() }));
  } catch {}
};

const TechNews = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const cached = readCache();
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        setArticles(cached.articles);
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/news');
        if (!res.ok) throw new Error(`API ${res.status}`);
        const data = await res.json();
        const fresh = data.articles || [];
        setArticles(fresh);
        writeCache(fresh);
      } catch (err) {
        console.error('TechNews fetch failed:', err);
        if (cached) {
          setArticles(cached.articles);
        } else {
          setArticles([]);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('es-CO', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <section id="news">
      <span className="component-label text-trace mb-3 block">DATA BUS · TECH NEWS</span>
      <h2 className="text-3xl lg:text-4xl font-bold text-silkscreen tracking-tight mb-12">
        Noticias Tech
      </h2>

      {isLoading ? (
        <div className="flex items-center justify-center py-16 gap-3">
          <Loader2 className="w-5 h-5 animate-spin text-trace" />
          <span className="font-mono text-sm text-silkscreen-dim tracking-wider">
            FETCHING DATA BUS...
          </span>
        </div>
      ) : articles.length === 0 ? (
        <div className="chip-body p-8 text-center">
          <Newspaper className="w-8 h-8 text-silkscreen-dim/30 mx-auto mb-3" />
          <p className="font-mono text-sm text-silkscreen-dim tracking-wider">
            SIGNAL LOST — NO DATA AVAILABLE
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {articles.map((article, i) => (
            <a
              key={i}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="chip-body p-4 group flex flex-col"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="font-mono text-[0.5rem] text-copper tracking-[0.2em] flex-shrink-0">
                  BUS{String(i + 1).padStart(2, '0')}
                </span>
                <ExternalLink className="w-3 h-3 text-silkscreen-dim/30 group-hover:text-trace transition-colors flex-shrink-0" />
              </div>
              <h3 className="text-sm font-semibold text-silkscreen mb-2 line-clamp-2 group-hover:text-trace-bright transition-colors leading-snug">
                {article.title}
              </h3>
              <p className="text-xs text-silkscreen-dim leading-relaxed mb-3 line-clamp-2 flex-1">
                {article.description || 'Sin descripción disponible.'}
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-trace/10">
                <span className="font-mono text-[0.625rem] text-silkscreen-dim tracking-wider">
                  {article.source.name}
                </span>
                <span className="font-mono text-[0.625rem] text-silkscreen-dim/50 tracking-wider">
                  {formatDate(article.publishedAt)}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  )
}

export default TechNews
