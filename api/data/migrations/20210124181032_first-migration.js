exports.up = async (knex) => {
  await knex.schema
    .createTable("roles", (roles) => {
      roles.increments("role_id");
      roles.string("role_name", 32).notNullable().unique();
    })
    .createTable("users", (users) => {
      users.increments("user_id");
      users.string("username", 200).notNullable().unique();
      users.string("password", 200).notNullable();
      users
        .integer("role_id")
        .unsigned()
        .notNullable()
        .references("role_id")
        .inTable("roles");
    })
    .createTable("classes", (classes) => {
      classes.increments("class_id");
      classes.string("class_name").notNullable().unique();
      classes.string("start_time").notNullable();
      classes.string("duration").notNullable();
      classes.string("intensity_level").notNullable();
      classes.string("location").notNullable();
      classes.integer("max_class_size").notNullable();
      classes
        .integer("instructor_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users");
    })
    .createTable("register", (register) => {
      register.increments("register_id");
      register
        .integer("class_id")
        .unsigned()
        .notNullable()
        .references("class_id")
        .inTable("classes")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
      register
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
    });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("register");
  await knex.schema.dropTableIfExists("classes");
  await knex.schema.dropTableIfExists("users");
  await knex.schema.dropTableIfExists("roles");
};
