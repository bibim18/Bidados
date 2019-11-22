import reply from '../src/utils/reply.flow'

test('test function reply', async() => {
    expect(reply('sssss', { message: 'sdsdsds'})).resolves.toBe(3)
})