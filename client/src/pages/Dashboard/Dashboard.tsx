import RecipeForm from '../../components/RecipeForm/RecipeForm'
import CreateRecipe from '../../components/CreateRecipe/CreateRecipe';
import { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';


//recipe creation -> title, image, ingrdients, instructions, tags, description
//          required field validation, success message when submitted, UI should
//          be updated without reload

//edit recipe -> buttons appears on creator dashboard
//      prefilled form loads existing data, save the updates, refresh list

//delete recipe -> button in the dsashboard, confirm the deletion, handle edge cases

function parseIngredients(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, quantity] = line.split(",").map((s) => s.trim());
      return { name: name || line, quantity: quantity || "" };
    });
}

function parseInstructions(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((description, index) => ({
      step: index + 1,
      description,
    }));
}

function parseTags(text: string) {
  return text
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

// Manually decode a JWT payload without adding a dependency.
// JWTs are structured as header.payload.signature, base64url-encoded.
function decodeToken(token: string): any {
  try {
    const payloadBase64 = token.split(".")[1];
    const decodedJson = atob(payloadBase64.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decodedJson);
  } catch (err) {
    console.log("Failed to decode token:", err);
    return null;
  }
}

function Dashboard() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [editingR, setEditR] = useState<any | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeToken(token);
      if (decoded?.user?._id) {
        setCurrentUserId(decoded.user._id);
      }
    }
    loadRecipes();
  }, []);

  function loadRecipes() {
    axios.get("http://localhost:3000/api/recipes").then((res) => {
      setRecipes(res.data);
    })
      .catch((err) => {
        console.log("no recipes loaded ", err)
      });
  }

  const myRecipes = recipes.filter((recipe) => recipe.ownerId === currentUserId);

  const handleSave = (recipeData: any) => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const payload = {
      ...recipeData,
      ingredients: parseIngredients(recipeData.ingredients),
      instructions: parseInstructions(recipeData.instructions),
      tags: parseTags(recipeData.tags),
    };

    if (editingR) {
      const id = editingR._id || editingR.id;
      axios
        .put(`http://localhost:3000/api/recipes/${id}`, payload, config)
        .then(() => {
          setEditR(null);
          loadRecipes();
        })
        .catch((err) => {
          console.log("no update ", err);
        });
    }
    else {
      axios
        .post(`http://localhost:3000/api/recipes`, payload, config)
        .then(() => {
          loadRecipes();
        })
        .catch((err) => {
          console.log("no creation: ", err);
        });
    }
  };

  const handleEdit = (recipe: any) => {
    setEditR(recipe);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this recipe?")) {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      axios.delete(`http://localhost:3000/api/recipes/${id}`, config)
        .then(() => {
          if (editingR && (editingR._id == id || editingR.id == id)) {
            setEditR(null);
          }
          loadRecipes();
        })
        .catch((err) => {
          console.log("didn't delete: ", err);
        });
    }
  };


  return (
    <div>
      <h1 className='CreatorDashboard'></h1>
      <Link to="/recipes">
        <button type="button">Explore Recipes</button>
      </Link>
      <h2>{editingR ? "Edit Recipe" : "Add Recipe"}</h2>

      <RecipeForm handleSubmit={handleSave} initialData={editingR} buttonText={editingR ? "Update Recipe" : "Create Recipe"} />
      {editingR && (
        <button type="button" onClick={() => setEditR(null)}> Cancel Edit</button>
      )}

      <hr />

      <h2>MyRecipes</h2>
      {myRecipes.length === 0 ? (
        <p>No recipes found in the database</p>
      ) : (
        myRecipes.map((recipe) => {
          const id = recipe._id || recipe.id;
          return (
            <CreateRecipe
              key={id}
              title={recipe.title}
              description={recipe.description}
              image={recipe.image}
              tags={recipe.tags}
              ingredients={recipe.ingredients}
              instructions={recipe.instructions}
              onEdit={() => handleEdit(recipe)}
              onDelete={() => handleDelete(id)}
            />
          );
        })
      )}

    </div>
  );
}

export default Dashboard;