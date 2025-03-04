import ProductCard from "../product-card/product-card.component";
import { CategoryPreviewContainer, CategoryPreviewTitle, CategoryPreviewPreview } from './category-preview.styles.jsx';

const CategoryPreview = ({ title, products }) => {
    return (
        <CategoryPreviewContainer>
            <h2>
                <CategoryPreviewTitle to={`/shop/${title.toLowerCase()}`}>{title.toUpperCase()}</CategoryPreviewTitle>
            </h2>
            <CategoryPreviewPreview>
                {
                    products.filter((_, index) => index < 4)
                    .map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </CategoryPreviewPreview>
        </CategoryPreviewContainer>
    )
}

export default CategoryPreview;