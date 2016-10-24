// models.js

var Sequelize = require('sequelize');

var sequelize = new Sequelize('bookdb', 'bookuser', 'bookpassword', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

var Author = sequelize.define('authors', {
  authorid: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  authorname: {
    type: Sequelize.STRING,
    defaultValue: 'Ernest Hemingway'
  }
}, {
  timestamps: false
});

var Book = sequelize.define('books', {
  bookid: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    defaultValue: 'A Farewell to Arms'
  },
  authorid: {
    model: Author,
    key: 'authorid',
    type: Sequelize.INTEGER,
    primaryKey: true
  }
}, {
  timestamps: false
});

Author.hasMany(Book, {
  foreignKey: 'authorid'
});

module.exports = {
  Author,
  Book
}