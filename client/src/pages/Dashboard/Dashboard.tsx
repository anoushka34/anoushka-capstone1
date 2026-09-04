import RecipeForm from '../../components/RecipeForm/RecipeForm'
import CreateRecipe from '../../components/CreateRecipe/CreateRecipe';
import {useState, useEffect} from 'react';
import axios from "axios";


//recipe creation -> title, image, ingrdients, instructions, tags, description
//          required field validation, success message when submitted, UI should
//          be updated without reload

//edit recipe -> buttons appears on creator dashboard
//      prefilled form loads existing data, save the updates, refresh list

//delete recipe -> button in the dsashboard, confirm the deletion, handle edge cases

function Dashboard() {
    const [recipes, setRecipes] = useState<any[]>([]);
    const[editingR, setEditR] = useState<any | null>(null);

    useEffect(() => {
        loadRecipes();
    }, []);

    function loadRecipes() {
        axios.get("http://localhost:3000/api/recipes").then((res)=> {
            setRecipes(res.data);
        })
        .catch((err)=> {
            console.log("no recipes loaded ", err)
        });
    }

    const handleSave=(recipeData:any) => {
        if(editingR)  {
            const id= editingR._id || editingR.id;
            axios
            .put(`http://localhost:3000/api/recipes/${id}`, recipeData)
            .then(()=> {
                setEditR(null); 
                loadRecipes();
            })
            .catch((err)=> {
                console.log("no update ", err);
            });
        }
        else {
            axios
            .post(`http://localhost:3000/api/recipes`, recipeData)
            .then(() => {
                loadRecipes();
            })
            .catch((err)=> {
                console.log("no creation: ", err);
            }); 
        }
    
    };

    const handleEdit = (recipe: any) => {
        setEditR(recipe);
    };

    const handleDelete = (id: string) => {
        if(window.confirm("Delete this recipe?")) {
            axios.delete(`http://localhost:3000/api/recipes/${id}`)
            .then(()=> {
                if(editingR && (editingR._id == id || editingR.id == id)) {
                    setEditR(null);
                }
                loadRecipes();
            })
            .catch((err)=> {
                console.log("didn't delete: ", err);
            });
        }
    };


    
    return (
        <div>
            <h1 className='CreatorDashboard'></h1>
            <h2>{editingR ? "Edit Recipe" : "Add Recipe"}</h2>

            <RecipeForm handleSubmit={handleSave} initialData={editingR} buttonText={editingR ? "Update Recipe" : "Create Recipe"}/>
            
            {editingR && (
                <button type="button" onClick={() => setEditR(null)}> Cancel Edit</button>
            )}

            <hr/>

            <h2>MyRecipes</h2>
            {recipes.length ===  0 ? (
                <p>No recipes found in the database</p>
            ) : (
                recipes.map((recipe) => {
                    const id = recipe._id || recipe.id;
                    return (
                        <CreateRecipe key={id} title={recipe.title} description={recipe.description} onEdit={() => handleEdit(recipe)} onDelete={() => handleDelete(id)}/>
                    );
                })
            )}

        </div>
    );
}

export default Dashboard;