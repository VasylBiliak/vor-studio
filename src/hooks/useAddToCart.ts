import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { Product } from '@/data/products';
import { addToCart, openCart } from '@/store/slices/cartSlice';

export const useAddToCart = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = (product: Product, size?: string) => {
    dispatch(addToCart({
      product,
      size: size ?? (product.sizes.length > 0 ? product.sizes[0] : undefined),
    }));
    dispatch(openCart());
  };

  return { handleAddToCart };
};