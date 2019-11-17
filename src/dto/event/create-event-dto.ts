export default class CreateEventDto {
    
    private name: string;
    private description: string;
    private committeeId: number;
    
    private startDate: Date;
    private endDate: Date;
    private signupBefore: Date;

    private memberOnly: boolean;
    private memberPrice: number;
    private notMemberPrice: number;
}