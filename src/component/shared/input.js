export const  InputWithLabell = ({name, value, type,label}) => {
    return (
        <label>
            {label}
            <input type={type} name={name} value={value} onChange={() =>{}}/>
        </label>
    )
}