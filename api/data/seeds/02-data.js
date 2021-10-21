exports.seed = async function (knex) {
  await knex("roles").insert([
    { role_name: "instructor" },
    { role_name: "client" },
  ]);
  await knex("users").insert([
    {
      username: "bob",
      password: "$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq", // password "1234"
      role_id: 1,
    },
    {
      username: "sue",
      password: "$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq", // password "1234"
      role_id: 2,
    },
  ]);
  await knex("classes").insert([
    {
      class_id: 2,
      class_name: "BootyBurn2.1",
      start_time: "10:00",
      duration: "1.5hr",
      intensity_level: "6",
      location: "Japan",
      max_class_size: 12,
      user_id: "1",
    },
    {
      class_id: 1,
      class_name: "Yoga2.0",
      start_time: "9:00",
      duration: "1hr",
      intensity_level: "4",
      location: "China",
      max_class_size: 15,
      user_id: "1",
    },
  ]);
};
