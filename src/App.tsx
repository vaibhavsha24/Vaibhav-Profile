import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ThemeProvider } from './hooks/useTheme';
import { AboutPage } from './pages/AboutPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { NowPage } from './pages/NowPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { RssPage } from './pages/RssPage';
import { SitemapPage } from './pages/SitemapPage';
import { WritingPage } from './pages/WritingPage';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/writing" element={<WritingPage />} />
            <Route path="/writing/:slug" element={<ArticleDetailPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/now" element={<NowPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/rss" element={<RssPage />} />
            <Route path="/sitemap" element={<SitemapPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}
