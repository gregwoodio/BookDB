// tests/author.js

module.exports = function(chai, server, assert) {

  describe('/POST to /api/author', function() {
    it('Should indicate successful addition', function(done) {
      chai.request(server)
      .post('/api/author')
      .send({
        authorname: 'Arthur Conan Doyle'
      })
      .end(function(err, res) {

        assert.equal(res.status, 200, 'Should return 200 OK status');
        assert.equal(res.body.success, true, 'Should indicate success.');

        done();
      });
    });
  });

  describe('/POST to /api/author but without parameters', function() {
    it('Should fail and return 403 error', function(done) {
      chai.request(server)
      .post('/api/author')
      .end(function(err, res) {

        assert.equal(res.status, 403, 'Should return 403 error.');
        assert.equal(res.body.success, false, 'Should indicate failure.');

        done();
      });
    });
  });

  describe('/GET to /api/author', function() {
    it('Should return JSON response of all authors.', function(done) {
      chai.request(server)
      .get('/api/author')
      .end(function(err, res) {

        assert.equal(res.status, 200, 'Should return 200 OK status');
        assert.equal(res.body.success, true, 'Should indicate success.');
        assert.typeOf(res.body.authors, 'array', 'Should return an array of all authors');

        done();
      });
    });
  });

  describe('/GET to /api/author/:id', function() {
    it('Should return JSON response of all authors.', function(done) {
      chai.request(server)
      .get('/api/author')
      .end(function(err, res) {

        author = res.body.authors[0]; //find an author

        chai.request(server)
        .get('/api/author/' + author.authorid)
        .end(function(err, res) {

          assert.equal(res.status, 200, 'Should return 200 OK status.');
          assert.equal(res.body.success, true, 'Should indicate success.');
          assert.typeOf(res.body.author, 'object', 'Should return the selected author as an object.');

          done();
        });
      });
    });
  });  

};