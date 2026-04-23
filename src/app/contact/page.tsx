import { fetchSeoData, buildMetadata } from '@/utils/seo';
import ContactContent from './ContactContent';

export async function generateMetadata() {
  const { seoData, defaultLanguage } = await fetchSeoData();

  return buildMetadata(seoData, 'contact', defaultLanguage, defaultLanguage, {
    pathname: '/contact',
  });
}

export default function ContactPage() {
  return <ContactContent />;
}
