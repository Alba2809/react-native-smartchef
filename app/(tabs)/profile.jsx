import { useEffect, useState } from "react";
import ProfileScreen from "../../components/users/ProfileScreen";
import useAuthStore from "../../store/authStore";
import useRecipeStore from "../../store/recipeStore";

export default function profile() {
  const { user } = useAuthStore();
  const { recipesSaved } = useRecipeStore();
  const [userRecipes, setUserRecipes] = useState([]);

  useEffect(() => {
    // get the recipes of the user
    if (user ) {
      const recipes = recipesSaved.filter(
        (recipe) => recipe.isOwner || recipe.user?.username === user.username
      );

      setUserRecipes(recipes);
    }
  }, [recipesSaved]);

  return <ProfileScreen isTheOwner={true} user={user} recipes={userRecipes} />;
}
