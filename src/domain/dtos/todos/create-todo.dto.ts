

export class CreateTodoDto {

    private constructor(
        public readonly text: string,
    ){}

    // retorna un arreglo en donde el 1: es un string que indica el error,
    // 2: una instancia del DTO, el ? me dice que son opcionales,
    // osea si no tenemos el error, tenemos el dto y viseversa.

    static create (props: {[key:string]: any}) : [string?, CreateTodoDto?] {
        
        const { text} = props;
        if (!text) return ['Text property is required', undefined];
        return [undefined, new CreateTodoDto( text)];
    }
}