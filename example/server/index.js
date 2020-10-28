import { test } from '../../test/fixture/basic.proto'
import grpc from 'grpc'

const server = new grpc.Server()
server.addProtoService(
  test.fixture.exampleService.service,
  {
    getBasicEntity() {},
    subBasicEntity() {},
    pubBasicEntity() {},
  }
)
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure())
server.start()
