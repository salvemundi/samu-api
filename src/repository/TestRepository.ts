import { Test } from 'src/entities/test';

export class TestRepository {
    public async getTest() {
        return await Test.find();
    }
}
