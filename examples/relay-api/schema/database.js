// We use these types to hold data and resolve from GraphQL types in our schema

function User(id, name) {
  this.id = id.toString()
  this.name = name
}

function Widget(id, userId, name) {
  this.id = id.toString()
  this.userId = userId.toString()
  this.name = name
}

// In a realistic system, the get functions below would return objects from a
// datastore like a DB or a REST API instead of an in-memory store like this.
// You can also return promises for async fetching

var users = [new User(1, 'Anonymous')]

var widgets = [
  new Widget(1, 1, 'What\'s-it'),
  new Widget(2, 1, 'Who\'s-it'),
  new Widget(3, 1, 'How\'s-it'),
]

module.exports = {
  User: User,
  Widget: Widget,
  getUser: function(id) { return users.filter(function(u) { return u.id == id })[0] },
  getAnonymousUser: function() { return users[0] },
  getWidget: function(id) { return widgets.filter(function(w) { return w.id == id })[0] },
  getWidgetsByUser: function(userId) { return widgets.filter(function(w) { return w.userId == userId }) },
}

