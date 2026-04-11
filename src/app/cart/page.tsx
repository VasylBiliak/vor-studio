import { fetchSeoData, buildMetadata } from '@/utils/seo';
import CartContent from './CartContent';

export async function generateMetadata() {
  const { seoData, defaultLanguage } = await fetchSeoData();

  return buildMetadata(seoData, 'cart', defaultLanguage, defaultLanguage, {
    pathname: '/cart',
  });
}

export default function CartPage() {
  return <CartContent />;
}