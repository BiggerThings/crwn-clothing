import { DirectoryContainer } from "./directory.styles.jsx";
import DirectoryItem from "../directory-item/directory-item.component.jsx";

const Directory = ({ categories }) => {
    return (
        <DirectoryContainer>
            {categories.map((category) => (
                <DirectoryItem key={category.id} title={category.title} imageUrl={category.imageUrl} />
            ))}
        </DirectoryContainer>
    )
} 
export default Directory;