INSERT INTO users 
(name, age)
VALUES 
($1, $2); 
-- $1, etc... is a parameter. It follows the order of the arguments in the the function invocation