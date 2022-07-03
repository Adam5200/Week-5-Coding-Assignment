/*
This program is meant to simulate an employee management system, if you could imagine a large retail store with multiple departments (electronics, grocery, front end, etc.).
With this program, you can create all of the departments of a fictional store named "Mall-Mart" and then assign employees to work in each one. You can also remove departments, employees, transfer employees
between departments, and change the job titles of employees.
*/

//Employee Class
class Employee {
    //Constructor which gives a name and a position
    constructor(name, job) {
        this.name = name
        this.job = job
    }

    //returns a string with the employee's name
    getName() {
        return this.name
    }

    //returns a more detailed string that includes both the employee's name and their position
    describe() {
        return `${this.name} is currently employed as ${this.job}`
    }
}

//Department Class
class Department {
    //Constructor which gives a name and an array to store employees
    constructor(name) {
        this.name = name
        this.employees = []
    }

    //returns a fancy string that describes how many employees work in the department
    describe() {
        return `${this.name} has ${this.employees.length} employees`
    }

    //function to add an employee to the department, requires an employee object to be passed through
    addEmployee(employee) {
        if (employee instanceof Employee) {
            this.employees.push(employee)
        } else {
            throw new Error(`Invalid Input: ${employee} is not of employee type`)
        }
    }
}

//Menu Class
class Menu {
    //Constructor which gives an array to store departments and a pointer which by default is set to null. Eventually will be pointing at Department objects
    constructor() {
        this.departments = []
        this.selectedDepartment = null
        this.nameOfStore = "Mall-Mart"
    }

    //The main function of the entire system.
    start() {
        //Obtaining the user's input by invoking the showMainMenuOptions function and setting it to the selection variable
        let selection = this.showMainMenuOptions()
        //Switch Case set in a while loop to handle user input. The only way to get booted out of the loop is by entering 0 or nothing at all
        while(selection != 0) {
            switch(selection) {
                case '1':
                    this.createDepartment()
                    break;
                case '2':
                    this.viewDepartment()
                    break;
                case '3':
                    this.deleteDepartment()
                    break;
                case '4':
                    alert(this.displayDepartments())
                    break;
                case '5':
                    alert(this.displayAllEmployees())
                    break;
                case "create dev store":
                    this.createExampleStore()
                    break;
                case "create dev employees":
                    this.createExampleEmployees()
                    break;
                default:
                    selection = 0
            }
            //We need a new selection before the loop and switch can be properly called again
            selection = this.showMainMenuOptions()
        }
        //This will display once the loop is finished running
        alert("Goodbye")
    }

    //returns a prompt containing the possible commands for the main menu
    showMainMenuOptions() {
        return prompt(`
        ${this.nameOfStore} Department Management System
        -------------------
        0 - Exit
        1 - Create New Department
        2 - View Department by Index
        3 - Delete Department
        4 - See All Departments
        5 - See All Employees
        `)  
    }

    //method to create a department. Will push a new department object with the given name to the departments array.
    createDepartment() {
        let name = prompt("Enter a name for the new department: ")
        this.departments.push(new Department(name))
        alert("New department created: " + this.departments[this.departments.length-1].name + "\nIndex: " + (this.departments.length - 1))
    }

    //method to delete a department, a confirm box is used to prevent accidental deletion
    deleteDepartment() {
        if(confirm("Are you sure you want to delete a department? Press OK to continue.")) {
            let index = prompt("Enter the index of the department to be deleted \n" + this.displayDepartments())
            if(index > -1 && index < this.departments.length)
                this.departments.splice(index, 1)
        }
    }

    //returns a string with all of the departments and their indexes.
    //used as a reference in certain prompts.
    displayDepartments() {
        let departmentString = "Departments: \n"
        
        for(let i = 0; i < this.departments.length; i++) {
            departmentString += i + " - " + this.departments[i].name + "\n"
        }
        //if there are no departments built yet in the system, this method will instead return a message stating so
        if(this.departments.length === 0) {
            return("There are no departments to display.")
        } else {
            return(departmentString)
        }
    }

    //returns a string with line breaks containing all of the employees (and their positions) working in the given department (passed as parameter).
    //used as a reference in certain prompts
    displayEmployees(dept) {
        let description = ""
        for(let i = 0; i < dept.employees.length; i++) {
            description += i + " - " + dept.employees[i].name + " is employed as " + dept.employees[i].job + "\n"
        }
        //if there are no employees working in the department, this method will instead return a message stating so
        if(dept.employees.length === 0) {
            return("There are no employees to display.")
        } else {
            return(description)
        }
    }

    //returns a string with all of the employees, sorted by departments
    displayAllEmployees() {
        let description = ""
        //sorting through departments
        for(let x = 0; x < this.departments.length; x++) {
            //sorting through employees per department
            for(let y = 0; y < this.departments[x].employees.length; y++) {
                description += x + " - " + this.departments[x].name +  " | " + this.departments[x].employees[y].name + " is employed as " + this.departments[x].employees[y].job + "\n"
            }
        }
        //checking to ensure we don't send back an empty string
        if(description === "") {
            return("There are no employees to display.")
        } else {
            return(description)
        }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //method invoked when user requests to view a department by index. This will bring up the department menu which has additional features, specifically employee management.
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    viewDepartment() {
        let index = prompt("Enter the index of the department you'd like to view: \n" + this.displayDepartments())
        if(index > -1 && index < this.departments.length && index != "") {
            this.selectedDepartment = this.departments[index]
            let description = "Department Name: " + this.selectedDepartment.name

            let selection = this.showDepartmentMenuOptions(description)
            while(selection != 0) {
                switch(selection) {
                    case "1":
                        this.createEmployee()
                        break;
                    case "2":
                        this.deleteEmployee()
                        break;
                    case "3":
                        this.transferEmployee()
                        break;
                    case "4":
                        this.changePosition()
                        break;
                    case "5":
                        alert(this.displayEmployees(this.selectedDepartment))
                        break;
                    case "6":
                        this.changeDepartmentName()
                        break;
                    default:
                        selection = 0
                }
                selection = this.showDepartmentMenuOptions(description)
            }
        }
    }

    //returns a prompt containing the possible commands once a department has been selected
    showDepartmentMenuOptions(deptInfo) {
        return prompt(`
        ${deptInfo}
        -------------------
        0 - Go Back
        1 - Create New Employee
        2 - Remove Employee
        3 - Transfer Existing Employee to This Department
        4 - Change Employee Position
        5 - Display All Employees In Department
        6 - Change Department Name
        `)  
    }

    //method to create an employee, will ask for their name and a job title
    createEmployee() {
        let name = prompt("Enter the name of the new employee:")
        let job = prompt("Enter " + name + "'s position:")
        this.selectedDepartment.employees.push(new Employee(name, job))
    }

    //method used to delete an employee. Again, a confirm box is used to prevent accidental deletion
    deleteEmployee() {
        if(confirm("Are you sure you want to delete an employee? Press OK to continue.")) {
            let index = prompt("Enter the index of the employee to be deleted \n" + this.displayEmployees(this.selectedDepartment))
            if(index > -1 && index < this.selectedDepartment.employees.length && index != "") {
                alert(this.selectedDepartment.employees[index].getName() + " has been removed.")
                this.selectedDepartment.employees.splice(index, 1)
            } else {
                alert("Input not recognized. No changes made.")
            }
        }
    }

    //a unique method that will "steal" an employee from another department, retaining their job title and removing them from the initial department
    transferEmployee() {
        let indexOfHome = prompt("Enter the department the employee will be transfered from \n" + this.displayDepartments())
        let indexOfEmployee = prompt("Enter the current index of the employee to be transfered")
        this.selectedDepartment.employees.push(this.departments[indexOfHome].employees[indexOfEmployee])
        this.departments[indexOfHome].employees.splice(indexOfEmployee, 1)
    }

    //method to change en employee's position, will ask for an employee index and a new string for a position
    changePosition() {
        let index = prompt("Enter the index of the employee to be changed: \n" + this.displayEmployees(this.selectedDepartment))
        if(index > -1 && index < this.selectedDepartment.employees.length && index != "") {
            this.selectedDepartment.employees[index].job = prompt("Enter the new position for " + this.selectedDepartment.employees[index].name)
            alert(this.selectedDepartment.employees[index].describe)
        } else {
            alert("Input not recognized. No changes made.")
        }
    }

    //simple method to change the name of the selected department
    changeDepartmentName() {
        let newName = prompt("Enter a new name for Department:")
        this.selectedDepartment.name = newName
    }

    //this is a dev method that will create a realistic instance of a store for you to create employees within.
    createExampleStore() {
        this.createDevDepartment("Front End")
        this.createDevDepartment("Produce")
        this.createDevDepartment("Toys")
        this.createDevDepartment("Electronics")
        this.createDevDepartment("Outside Yard")
        this.createDevDepartment("Paint and Chemicals")
        this.createDevDepartment("Receiving")
        this.createDevDepartment("General Management")
    }

    //this is a very crude dev method that will create 3 employees in each department. All the employees will have the same name and title. Used strictly for testing.
    createExampleEmployees() {
        for(let i = 0; i < this.departments.length; i++) {
            this.departments[i].addEmployee(new Employee("Thomas", "Stocker"))
            this.departments[i].addEmployee(new Employee("Bill", "Sales"))
            this.departments[i].addEmployee(new Employee("Jennifer", "Manager"))
        }
    }

    //dev method. Identical to the original createDepartment method but this one takes in a string, so Departments can be coded in
    createDevDepartment(name) {
        this.departments.push(new Department(name))
    }
}

//creating a new menu object and then calling its start method
let menu = new Menu()
menu.start()