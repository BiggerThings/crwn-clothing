import { useNavigate } from "react-router";
import {
  DirectoryItemContainer,
  BackgroundImage,
  Body
 } from "./directory-item.styles.jsx";

const DirectoryItem = ({ imageUrl, title, route }) => {
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);
  
  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
        <BackgroundImage 
          imageUrl={imageUrl}
        />
        <Body>
          <h2>{title}</h2>
          <p>Shop Now</p>
        </Body>
    </DirectoryItemContainer>
  )
}

export default DirectoryItem;