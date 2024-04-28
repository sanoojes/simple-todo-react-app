interface IProps {
    onChange(text: string): void;
    value: string;
}
const Input = ({ value, onChange }: IProps) => {
    return (
        <>
            <input
                value={value}
                type="text"
                placeholder="Add your task"
                onChange={(e) => onChange(e.target.value)}
                className="px-4 rounded-full 
                text-neutral-950 focus:outline-none bg-transparent placeholder:text-neutral-800 w-full"
            />
        </>
    );
};

export default Input;
