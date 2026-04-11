import { fetchSeoData, buildMetadata } from '@/utils/seo';
import HomeContent from './HomeContent';

export async function generateMetadata() {
  const { seoData, defaultLanguage } = await fetchSeoData();

  return buildMetadata(seoData, 'home', defaultLanguage, defaultLanguage, {
    pathname: '/',
  });
}

export default function Page() {
  return <HomeContent />;
}