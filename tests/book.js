// tests/book.js

module.exports = function(chai, server, assert) {

  describe('/POST to /api/book', function() {
    it('Should indicate successful addition', function(done) {

      chai.request(server)
      .get('/api/author')
      .end(function(err, res) {

        author = res.body.authors[0];

        chai.request(server)
        .post('/api/book')
        .send({
          title: 'A Study in Scarlet',
          authorid: author.authorid
        })
        .end(function(err, res) {

          assert.equal(res.status, 200, 'Should return 200 OK status');
          assert.equal(res.body.success, true, 'Should indicate success.');

          done();
        });
      });
    });
  });

  describe('/GET to /api/book', function() {
    it('Should return JSON response of all books', function(done) {
      chai.request(server)
      .get('/api/book')
      .end(function(err, res) {

        assert.equal(res.status, 200, 'Should return 200 OK status');
        assert.equal(res.body.success, true, 'Should indicate success.');
        assert.typeOf(res.body.books, 'array', 'Should return an array of all books');

        done();
      });
    });
  });

  describe('/GET to /api/book', function() {
    it('Should return JSON response of all books', function(done) {
      chai.request(server)
      .get('/api/book')
      .end(function(err, res) {

        book = res.body.books[0];

        chai.request(server)
        .get('/api/book/' + book.bookid)
        .end(function(err, res) {

          assert.equal(res.status, 200, 'Should return 200 OK status');
          assert.equal(res.body.success, true, 'Should indicate success.');
          assert.typeOf(res.body.author, 'object', 'Should return the requested book as an object');

          done();
        });
      });
    });
  });

};