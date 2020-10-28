import { test } from '../../test/fixture/basic.proto'

const client = new test.fixture.basicService(
  'localhost:50051',
  grpc.credential.createInsecure(),
)
client.getBasicEntity({ id: 0 }, function (err, basicEntityResponse) {
  if (err) {
    return console.error(err)
  } 
  console.log('received basicEntityResponse', basicEntityResponse)
})
