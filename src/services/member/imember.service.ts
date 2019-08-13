import { Member } from 'src/entities/member.entity';

export interface IMemberService {
    readAll(skip: number, take: number): Promise<Member[]>;
    readOne(id: number): Promise<Member>;
    create(member: Member): Promise<Member>;
    update(member: Member): Promise<Member>;
}
