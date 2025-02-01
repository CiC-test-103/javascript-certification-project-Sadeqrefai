// Necessary Imports, DO NOT REMOVE
const { LinkedList } = require("./LinkedList");
const { Student } = require('./Student');
const readline = require('readline');

// Initialize terminal interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Creates the Student Management System as a Linked List
/**
 * studentManagementSystem is the object that the main() function will be modifying
 */
const studentManagementSystem = new LinkedList();

// Display available commands
function main() {
  console.log(`
      Available Commands:
      - add [name] [year] [email] [specialization]: Add a student
      - remove [email]: Remove a student by email
      - display: Show all students
      - find [email]: Find a student by email
      - save: Save the current linked list to the specified file
      - load [fileName]: Load a linked list from a file
      - clear: Clear the current linked list
      - q: Quit the terminal
  `);
}

// Command handling logic
async function handleCommand(command) {
  const [operation, ...args] = command.trim().split(' ');

  switch (operation) {
    case 'add':
      console.log('Adding student...');
      const [name, year, email, specialization] = args;
      const newStudent = new Student(name, parseInt(year), email, specialization);
      studentManagementSystem.addStudent(newStudent);
      console.log(studentManagementSystem.displayStudents());
      break;

    case 'remove':
      console.log('Removing student...');
      const removeEmail = args[0];
      studentManagementSystem.removeStudent(removeEmail);
      console.log(studentManagementSystem.displayStudents());
      break;

    case 'display':
      console.log('Displaying students...');
      console.log(studentManagementSystem.displayStudents());
      break;

    case 'find':
      console.log('Finding student...');
      const findEmail = args[0];
      const foundStudent = studentManagementSystem.findStudent(findEmail);
      if (foundStudent === -1) {
        console.log('Student does not exist');
      } else {
        console.log(foundStudent.getString());
      }
      break;

    case 'save':
      console.log('Saving data...');
      const saveFileName = args[0];
      await studentManagementSystem.saveToJson(saveFileName);
      break;

    case 'load':
      console.log('Loading data...');
      const loadFileName = args[0];
      await studentManagementSystem.loadFromJSON(loadFileName);
      console.log(studentManagementSystem.displayStudents());
      break;

    case 'clear':
      console.log('Clearing data...');
      studentManagementSystem.clearStudents();
      console.log(studentManagementSystem.displayStudents());
      break;

    case 'q':
      console.log('Exiting...');
      rl.close();
      break;

    default:
      console.log('Unknown command. Type "help" for a list of commands.');
      break;
  }
}

// Start terminal-based interaction (DO NOT MODIFY)
console.log('Welcome to the Student Management System!');
main();
rl.on('line', async (input) => {
  if (input.trim().toLowerCase() === 'help') {
    main();
  } else {
    await handleCommand(input);
  }
});
rl.on('close', () => {
  console.log('Goodbye!');
});
