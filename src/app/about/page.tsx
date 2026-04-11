import { fetchSeoData, buildMetadata } from '@/utils/seo';
import AboutContent from './AboutContent';

export async function generateMetadata() {
  const { seoData, defaultLanguage } = await fetchSeoData();

  return buildMetadata(seoData, 'about', defaultLanguage, defaultLanguage, {
    pathname: '/about',
  });
}

export default function AboutPage() {
  return <AboutContent />;
}
