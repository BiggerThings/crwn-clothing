import "./directory.styles.scss";
import DirectoryItem from "../directory-item/directory-item.component.jsx";

const Directory = ({ categories }) => {
    return (
        <div className="directory-container">
            {categories.map((category) => (
                <DirectoryItem key={category.id} title={category.title} imageUrl={category.imageUrl} />
            ))}
        </div>
    )
} 
export default Directory;