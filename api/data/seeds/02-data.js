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
    {
      username: "Mason",
      password: "$2a$08$gjh6dU/Jv.Un7INLAc3LZOs9KJTc6DEU6wDOFDUbeuB23pg4Plroi",
      role_id: 1,
    },
    {
      username: "Allison",
      password: "$2a$08$lx6QQ5o.gG6CiSSOEWrznefIhUCpGou9fIGtOhP62y1CLqItSf0le",
      role_id: 2,
    },
    {
      username: "Chase",
      password: "$2a$08$.TCTKyS2RDui8TCIHaAnH.3v6MyQqFminUllD6xfCZjvMIQVnAIeS",
      role_id: 2,
    },
    {
      username: "Sonya",
      password: "$2a$08$Ee3ZCMjXz9dc23xdAwVT/.nWTxz1ji9m.qp0r4aPVA7EZHqOcJV4u",
      role_id: 2,
    },
    {
      username: "Xavier",
      password: "$2a$08$QfjujHDK9hcxJSXlc7HXTOp6guo7.JSgqnTne5dCoxpxllwyh5bIy",
      role_id: 2,
    },
  ]);
  await knex("classes").insert([
    {
      class_name: "BootyBurn2.1",
      start_time: "10:00",
      duration: "1.5hr",
      intensity_level: "6",
      location: "Japan",
      max_class_size: 12,
      instructor_id: "1",
    },
    {
      class_name: "Yoga2.0",
      start_time: "9:00",
      duration: "1hr",
      intensity_level: "4",
      location: "China",
      max_class_size: 15,
      instructor_id: "3",
    },
  ]);
  await knex("register").insert([
    {
      user_id: "2",
      class_id: "1",
    },
    {
      user_id: "3",
      class_id: "2",
    },
    {
      user_id: "4",
      class_id: "1",
    },
    {
      user_id: "5",
      class_id: "2",
    },
    {
      user_id: "6",
      class_id: "1",
    },
    {
      user_id: "7",
      class_id: "1",
    },
    {
      user_id: "7",
      class_id: "2",
    },
  ]);
};
