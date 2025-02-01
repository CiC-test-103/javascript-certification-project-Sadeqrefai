// Import the Student class from Student.js
const { Student } = require('./Student');

// Node class to represent each element in the linked list
class Node {
  constructor(data) {
    this.data = data; // This will hold the student object
    this.next = null; // This points to the next node in the list
  }
}

// LinkedList class to manage the list of students
class LinkedList {
  constructor() {
    this.head = null; // The first node in the list
    this.tail = null; // The last node in the list
    this.length = 0;  // The number of nodes in the list
  }

  // Method to add a new student to the list
  addStudent(newStudent) {
    const newNode = new Node(newStudent); // Create a new node with the student

    if (!this.head) {
      // If the list is empty, set head and tail to the new node
      this.head = newNode;
      this.tail = newNode;
    } else {
      // Otherwise, add the new node to the end of the list
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++; // Increase the length of the list
  }

  // Method to remove a student by their email
  removeStudent(email) {
    if (!this.head) return; // If the list is empty, do nothing

    if (this.head.data.getEmail() === email) {
      // If the student to remove is the first node
      this.head = this.head.next; // Move the head to the next node
      this.length--;
      return;
    }

    let current = this.head; // Start from the first node
    while (current.next && current.next.data.getEmail() !== email) {
      // Traverse the list to find the node before the one to remove
      current = current.next;
    }

    if (current.next) {
      // If the node to remove is found
      if (current.next === this.tail) {
        // If it's the last node, update the tail
        this.tail = current;
      }
      current.next = current.next.next; // Remove the node
      this.length--; // Decrease the length of the list
    }
  }

  // Method to find a student by their email
  findStudent(email) {
    let current = this.head; // Start from the first node
    while (current) {
      if (current.data.getEmail() === email) {
        // If the email matches, return the student object
        return current.data;
      }
      current = current.next; // Move to the next node
    }
    return -1; // If not found, return -1
  }

  // Method to display all students in the list
  displayStudents() {
    let result = []; // Array to hold student names
    let current = this.head; // Start from the first node
    while (current) {
      result.push(current.data.getName()); // Add student name to the result
      current = current.next; // Move to the next node
    }
    return result.join(', '); // Return names as a comma-separated string
  }

  // Method to clear all students from the list
  clearStudents() {
    this.head = null; // Reset the head
    this.tail = null; // Reset the tail
    this.length = 0;  // Reset the length
  }

  // Method to filter students by specialization
  filterBySpecialization(specialization) {
    let result = []; // Array to hold matching students
    let current = this.head; // Start from the first node
    while (current) {
      if (current.data.getSpecialization() === specialization) {
        // If specialization matches, add the student to the result
        result.push(current.data);
      }
      current = current.next; // Move to the next node
    }
    return result.sort((a, b) => a.getName().localeCompare(b.getName())); // Sort by name and return
  }

  // Method to filter students by minimum age (year of study)
  filterByMinAge(minAge) {
    let result = []; // Array to hold matching students
    let current = this.head; // Start from the first node
    while (current) {
      if (current.data.getYear() >= minAge) {
        // If year of study is greater than or equal to minAge, add to result
        result.push(current.data);
      }
      current = current.next; // Move to the next node
    }
    return result.sort((a, b) => a.getName().localeCompare(b.getName())); // Sort by name and return
  }

  // Method to save the list to a JSON file
  async saveToJson(fileName) {
    const fs = require('fs/promises'); // Import file system module for promises
    let current = this.head; // Start from the first node
    const studentsArray = []; // Array to hold student objects

    while (current) {
      studentsArray.push({
        name: current.data.getName(),
        year: current.data.getYear(),
        email: current.data.getEmail(),
        specialization: current.data.getSpecialization()
      });
      current = current.next; // Move to the next node
    }

    await fs.writeFile(fileName, JSON.stringify(studentsArray, null, 2)); // Write to file
  }

  // Method to load the list from a JSON file
  async loadFromJSON(fileName) {
    const fs = require('fs/promises'); // Import file system module for promises
    const data = await fs.readFile(fileName, 'utf8'); // Read the file
    const studentsArray = JSON.parse(data); // Parse the JSON data

    this.clearStudents(); // Clear the current list

    studentsArray.forEach(studentData => {
      // Create and add each student to the list
      const student = new Student(
        studentData.name,
        studentData.year,
        studentData.email,
        studentData.specialization
      );
      this.addStudent(student);
    });
  }
}

module.exports = { LinkedList }; // Export the LinkedList class
