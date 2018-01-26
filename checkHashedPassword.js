// $2a$10$.r4uvyuXe8GE/qPF5rdthujoyxl6kgO0FWrvuJfKGwBKKd9GTk.BS

const bcrypt = require('bcryptjs');


// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash('password123', salt, function (err, hashPassword) {
//         console.log(hashPassword);
//     });
// });

bcrypt.compare('password123', '$2a$10$gfLOOqa0KAM6s.JMPbesRebwHRATgD79tUOGWaye9ofFa67mRZfHG', (err, result) => {


    console.log(result);
});


