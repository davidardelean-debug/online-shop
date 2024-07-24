import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { CustomersController } from './customers.controller';

describe('CustomersController', () => {
  let controller: CustomersController;

  // const requestMock = {
  //   query:{},
  // } as unknown as Request;

  // const responseMock ={
  //   status: jest.fn(x=>{
  //     jest.fn(y=>y)
  //   }),
  //   send: jest.fn(x=>x)
  // }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[AppModule],
      controllers: [CustomersController],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
