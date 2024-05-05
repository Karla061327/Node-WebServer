 
 //*CREACION DE LA ENTIDAD
 export class TodoEntity {

    constructor(
        public id: number,
        public text: string,
        public completedAt?: Date|null
    ){}

    //SI TIENE UN VALOR VA A SER TRUE (!!)DOBLE NEGACION
    get isCompleted() {
        return !!this.completedAt;
    }

    public static fromObject (object:{[key: string]: any}){
        const {id, text, completedAt} = object;
        if (!id) throw 'Id is required';
        if (!text) throw 'text is required';

        let newCompletedAt;
        if(completedAt) {
            newCompletedAt = new Date(completedAt);
            if (isNaN(newCompletedAt.getTime())){
                throw 'CompletedAt is not a valid date'
            }
        }
        return new TodoEntity(id, text, completedAt);
    }
 } 