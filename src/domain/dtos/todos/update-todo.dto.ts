

export class UpdateTodoDto {

    private constructor(
        public readonly id: number,
        public readonly text?: string,
        public readonly completedAt?: Date,
    ){}

    //solo tiene las propiedades que quiero para la actualización,
    //es el updateTodoD implementado
    get values() {
        const returnObj: {[key: string]: any} = {};

        if (this.text) returnObj.text = this.text;
        if (this.completedAt) returnObj.completedAt = this.completedAt;

        return returnObj;
    }
    static create (props: {[key:string]: any}) : [string?, UpdateTodoDto?] {
        
        const { id, text, completedAt} = props;
        let newCompletedAt = completedAt;
        
        if (!id || isNaN(Number(id))){ 
            return ['id must be a number'];
        }

        if (completedAt) { 
            newCompletedAt = new Date(completedAt)
            if(newCompletedAt.toString() === 'Invalid Date'){
                return ['completedAt must be a valid date']
            }
        }
        return [undefined, new UpdateTodoDto(id, text, completedAt)];
    }
}