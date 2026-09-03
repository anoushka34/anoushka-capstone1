import RecipeForm from '../../components/RecipeForm/RecipeForm'
import CreateRecipe from '../../components/CreateRecipe/CreateRecipe';

//recipe creation -> title, image, ingrdients, instructions, tags, description
//          required field validation, success message when submitted, UI should
//          be updated without reload

//edit recipe -> buttons appears on creator dashboard
//      prefilled form loads existing data, save the updates, refresh list

//delete recipe -> button in the dsashboard, confirm the deletion, handle edge cases

function Dashboard() {
    const handleCreate = (recipeData: any) => {
        console.log("New Recipe Created", recipeData);
        alert("Recipe Created");
    };
    
    const handleEdit = () => {
        alert("Edit selected");
    };

    const handleDelete = () => {
        if(window.confirm("Delete this recipe?")) {
            alert("Recipe Deleted");
        }
    };

    
    
    return (
        <div>
            <h1 className='CreatorDashboard'></h1>
            <h2>Add Recipe</h2>
            <RecipeForm handleSubmit={handleCreate}/>

            <hr/>

            <h2>MyRecipes</h2>
            <CreateRecipe title="steak" description="romaine" onEdit={handleEdit} onDelete={handleDelete}/>

        </div>
    );
}

export default Dashboard;