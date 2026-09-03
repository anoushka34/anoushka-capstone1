type CreatorItemProps = {
    title:string;
    description: string;
    onEdit: () => void;
    onDelete: () => void;
};

function CreateRecipe (props:CreatorItemProps) {
    return (
        <div>
            <h3>{props.title}</h3>
            <p>{props.description}</p>
            <button onClick={props.onEdit}>Edit</button>
            <button onClick={props.onDelete}>Delete</button>
        </div>
    )
}



export default CreateRecipe;