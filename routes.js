// routes.js

var models = require('./models');

module.exports = function(app) {

  app.get('/', function(req, res) {
    res.json({
      success: true,
      message: 'Welcome to our API!'
    });
  });

  app.get('/api/author', function(req, res) {

    models.Author.findAll()
    .then(function(authors) {
      res.json({
        success: true,
        message: 'Here\'s the list of our authors!',
        authors: authors
      })
    })
    .catch(function(err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    });
  });

  app.get('/api/author/:id', function(req, res) {

    models.Author.find({
      where: {
        authorid: req.params.id
      }
    })
    .then(function(author) {
      res.json({
        success: true,
        author: author
      });
    })
    .catch(function(err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    });
  });

  app.post('/api/author', function(req, res) {

    if (req.body.authorname) {

      models.Author.build({
        authorname: req.body.authorname
      })
      .save()
      .then(function(author) {
        res.json({
          success: true,
          message: 'Author ' + author.authorname + ' added to the database.'
        });
      })
      .catch(function(err) {
        res.status(500).json({
          success: false,
          message: err.message
        });
      });

    } else {
      res.status(403).json({
        success: false,
        message: 'Missing author\'s name.'
      });
    }

  }); 

  app.put('/api/author/:id', function(req, res) {

    if (req.body.authorname) {

      models.Author.update({
        authorname: req.body.authorname
      }, {
        where: {
          authorid: req.params.id
        }
      })
      .then(function(author) {
        res.json({
          success: true,
          message: 'Author updated.'
        });
      })
      .catch(function(err) {
        res.status(500).json({
          success: false,
          message: err.message
        });
      });

    } else {
      res.status(403).json({
        success: false,
        message: 'Missing author\'s name.'
      });
    }

  });

  app.delete('/api/author/:id', function(req, res) {

    models.Author.destroy({
      where: {
        authorid: req.params.id
      }
    })
    .then(function(author) {
      res.json({
        success: true,
        message: 'Author deleted! Sayonara!'
      });
    })
    .catch(function(err) {
      res.json({
        success: false,
        message: err.message
      })
    });

  });

  app.get('/api/book', function(req, res) {
    models.Book.findAll()
    .then(function(books) {
      res.json({
        success: true,
        message: 'Here\'s the list of our books!',
        books: books
      })
    })
    .catch(function(err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    });
  });

  app.get('/api/book/:id', function(req, res) {
    models.Book.find({
      where: {
        bookid: req.params.id
      }
    })
    .then(function(book) {
      res.json({
        success: true,
        author: book
      });
    })
    .catch(function(err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    });
  });

  app.post('/api/book', function(req, res) {
    if (req.body.title && req.body.authorid) {

      models.Book.build({
        title: req.body.title,
        authorid: req.body.authorid
      })
      .save()
      .then(function(book) {
        res.json({
          success: true,
          message: 'Book ' + book.title + ' added to the database.'
        });
      })
      .catch(function(err) {
        res.status(500).json({
          success: false,
          message: err.message
        });
      });

    } else {
      res.status(403).json({
        success: false,
        message: 'Missing parameters for adding books.'
      });
    }
  });

  app.put('/api/book/:id', function(req, res) {

    if (req.body.authorid && req.body.title) {

      models.Book.update({
        authorid: req.body.authorid,
        title: req.body.title
      }, {
        where: {
          bookid: req.params.id
        }
      })
      .then(function(book) {
        res.json({
          success: true,
          message: 'Book updated.'
        });
      })
      .catch(function(err) {
        res.status(500).json({
          success: false,
          message: err.message
        });
      });

    } else {
      res.status(403).json({
        success: false,
        message: 'Missing author\'s name.'
      });
    }
  });

  app.delete('/api/book/:id', function(req, res) {

    models.Book.destroy({
      where: {
        bookid: req.params.id
      }
    })
    .then(function(book) {
      res.json({
        success: true,
        message: 'Book deleted! Arrivederci!'
      });
    })
    .catch(function(err) {
      res.json({
        success: false,
        message: err.message
      })
    });
  });
};