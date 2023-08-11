const { totalLikes } = require('../utils/list_helper')

describe('totalLikes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]
  
    const listWithMultipleBlogs = [
      {
        _id: '5a422aa71b54a676234d17f9',
        title: 'On the Cruelty of Really Teaching Computing Science',
        author: 'Edsger W. Dijkstra',
        url: 'https://www.cs.utexas.edu/~EWD/transcriptions/EWD10xx/EWD1036.html',
        likes: 10,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17fa',
        title: 'The Humble Programmer',
        author: 'Edsger W. Dijkstra',
        url: 'https://www.cs.utexas.edu/~EWD/transcriptions/EWD03xx/EWD340.html',
        likes: 15,
        __v: 0
      },
      ...listWithOneBlog
    ]
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })
  
    test('when list has multiple blogs, equals the sum of likes', () => {
      const result = totalLikes(listWithMultipleBlogs)
      expect(result).toBe(30) // 5 + 10 + 15
    })
  
    test('when list is empty, equals zero', () => {
      const result = totalLikes([])
      expect(result).toBe(0)
    })
  })
  