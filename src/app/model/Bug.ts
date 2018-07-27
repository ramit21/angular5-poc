export class Bug {
    id : number;
	name : string;
	isClosed : boolean;
	createdAt : Date;

    constructor(id : number, name : string, isClosed : boolean = false){
        this.id = id;
        this.name = name;
        this.isClosed = isClosed;
        this.createdAt = new Date();
    }



}