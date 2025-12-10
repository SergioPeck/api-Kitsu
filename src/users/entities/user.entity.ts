import { Role } from "src/common/role.enum";
import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn } from "typeorm"
@Entity()
@Unique(['email'])
export class User {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({nullable: false, unique: true})
    uid: string;

    @Column({nullable: false})
    email: string;

    @Column({nullable: false})
    displayName: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,
        nullable: false,
    })
    role: Role;

    @CreateDateColumn({nullable: false})
    createdAt: Date;
}