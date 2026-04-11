import { fetchSeoData, buildMetadata } from '@/utils/seo';
import { getProductById } from '@/utils/productsApi';
import ProductContent from './ProductContent';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = parseInt(id, 10);
  const { seoData, defaultLanguage } = await fetchSeoData();

  // Fetch product for dynamic title prefix
  const product = await getProductById(productId, defaultLanguage, defaultLanguage);

  // Build metadata with product name as title prefix if available
  // Example: "Product Name | Shop Our Products"
  return buildMetadata(seoData, 'product', defaultLanguage, defaultLanguage, {
    pathname: `/product/${id}`,
    titlePrefix: product?.name,
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  return <ProductContent id={id} />;
}