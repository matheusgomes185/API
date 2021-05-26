import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity("challenges")
class Challenge {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    type: string;
    
    @Column()
    description: string;
    
    @Column()
    amount: number;
    
    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}

export { Challenge };

