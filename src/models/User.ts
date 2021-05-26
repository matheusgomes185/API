import bcrypt from 'bcryptjs';
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity("users")
class User {

    @PrimaryColumn()
    // @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    username: string;

    @Column({ default: 0 })
    level: number;

    @Column({ default: 0 })
    currentExperience: number;
    
    @Column({ default: 0 })
    challengesCompleted: number;
    
    @CreateDateColumn()
    created_at: Date;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassowrd() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}

export { User };

