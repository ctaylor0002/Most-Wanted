/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTraits(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = findPersonFamily(person[0], people);
            alert(personFamily);
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            alert(personDescendants);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁


function displayPerson(person) {
    //These two arrays are for looking up values from the person object and providing a more user friendly message
    let personInfoProperties = ["First Name:", "Last Name:", "ID:", "Gender:", "Date of Birth:", "Height:", "Weight:", "Eye Color:", "Occupation:"];
    const props = Object.getOwnPropertyNames(person)
    let printString = "";
   
    //I used a for loop however I don't quite know if that is the best method in this case
    for(let i=0; i<9; i++) {
        let personVal = person[props[i]];
        let addString = `${personInfoProperties[i]} ${personVal}`;
        printString = `${printString}\n ${addString}`;
    }
    
    //Return the printString Variable
    return printString;

    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
}
// End of displayPerson()

/**
 * This function will be used to find the person's parent from the database.
 * This will utilize a filter based on the passed in persons "parents" field.
 * This will return the names of any parents found based on the id.
 * @param {Object} person       A singular object from person database. 
 */

function findPersonFamily(person, people) {
    let parents = findPersonParents(person, people);
    let siblingsAndSpouse = findPersonSiblingsAndSpouse(person, people);
    let returnData = parents;
    returnData.push(siblingsAndSpouse);

    return returnData;
}

function findPersonParents(person, people) {
    let parents = people.filter(function (element) {
        let personParentID = person.parents

        if (personParentID.length >= 1) {
            for(let i=0;i<=personParentID.length;i++) {
                if (personParentID[i] === element.id) {
                    return true;
                    break;
                }
                 
            }

        }

    }).map(function (el) {
        return ` Parent: ${el.firstName} ${el.lastName}\n`;
    })

    if (parents.length >= 1) {
        return parents;
    } else {
        return 'No Parents were found in our database.';
    }
}

function findPersonSiblingsAndSpouse(person, people) {
    let foundSiblings = findBasedOnLastName(person, people);
    let removePeople = person.parents;
    removePeople.push(person.currentSpouse);
    let foundFamily = foundSiblings.filter(function (element) {
        for(let i=0; i<=removePeople.length; i++) {
            if (person.parents[i] === element.id || person.id === element.id) {
                return false;
                break;
            } else {
                return true;
            }
        }
    }).map(function (el) {
        if (el.id === person.currentSpouse) {
            return `Spouse: ${el.firstName} ${el.lastName}\n`;
        } else {
            return `Sibling: ${el.firstName} ${el.lastName}\n`;
        }
    })
    

    return foundFamily;
}

function findBasedOnLastName(person, people) {
    let personLastName = person.lastName;

    let personSiblings = people.filter(function (el) {
        if (el.lastName.includes(personLastName)) {
            return true;
        } else {
            return false;
        }
   
    }) 
    return personSiblings;
}

/**
 * This function's purpose is to use recusion to find all people that are children of a specific parent.
 * If any are applicable
 * @param {Object} parent       Holds the Parent Object
 * @param {Array} people        Holds the Database of People
 */


function findPersonDescendants(parent, people) {
    //Come back to this part
}

function searchRequirements(people) {
    let userCheck = promptFor("Would you like to add more traits to filter by? ('yes' or 'no' ", yesNo);
    switch (userCheck) {
        case "yes":
            searchValue.push(promptFor(
                `Searching based on id? Enter '${props[0]}'\n
        Searching based on First Name? Enter '${props[1]}'\n
        Searching based on Last Name? Enter '${props[2]}'\n
        Searching based on Gender? Enter '${props[3]}'\n
        Searching based on Date of Birth? Enter '${props[4]}'\n
        Searching based on Height? Enter '${props[5]}'\n
        Searching based on Weight? Enter '${props[6]}'\n
        Searching based on Eye Color? Enter '${props[7]}'\n
        Searching based on Occupation? Enter '${props[8]}'\n
        Searching based on Parents? Enter '${props[9]}'\n
        Searching based on Current Spouse? Enter '${props[10]}'\n`,
                chars
                ));
        
        case "no":
            searchResults
            
    }

    
}


function searchByTraits(people) {
    const props = Object.getOwnPropertyNames(people[0])
    let searchValue;
    searchValue.push(promptFor(
        `Searching based on id? Enter '${props[0]}'\n
Searching based on First Name? Enter '${props[1]}'\n
Searching based on Last Name? Enter '${props[2]}'\n
Searching based on Gender? Enter '${props[3]}'\n
Searching based on Date of Birth? Enter '${props[4]}'\n
Searching based on Height? Enter '${props[5]}'\n
Searching based on Weight? Enter '${props[6]}'\n
Searching based on Eye Color? Enter '${props[7]}'\n
Searching based on Occupation? Enter '${props[8]}'\n
Searching based on Parents? Enter '${props[9]}'\n
Searching based on Current Spouse? Enter '${props[10]}'\n`,
        chars
        ));

        //if (searchValue.length < 5) {
        //    searchRequirements(people);
        //}

        let searchResults;

        switch (searchValue) {
            case "id":
                searchResults = searchByProperty(people,props[0]);
                alert(searchResults);
                break;
            case "firstName":
                searchResults = searchByProperty(people,props[1]);
                alert(searchResults);
                break;
            case "lastName":
                searchResults = searchByProperty(people,props[2]);
                alert(searchResults);
                break;
            case "gender":
                searchResults = searchByProperty(people,props[3]);
                alert(searchResults);
                break;
            case "dob":
                searchResults = searchByProperty(people,props[4]);
                alert(searchResults);
                break;
            case "height":
                searchResults = searchByProperty(people,props[5]);
                alert(searchResults);
                break;
            case "weight":
                searchResults = searchByProperty(people,props[6]);
                alert(searchResults);
                break;
            case "occupation":
                searchResults = searchByProperty(people,props[7]);
                alert(searchResults);
                break;
            case "parents":
                searchResults = searchByProperty(people,props[8]);
                alert(searchResults);
                break;
            case "currentSpouse":
                searchResults = searchByProperty(people,props[9]);
                alert(searchResults);
                break;
            default:
                app(people);
                break;
                
        }

        
}

function searchByProperty(people, property) {
    let Value = prompt(`Enter ${property} Value: `)
    let items = people.filter(function (el) {
        try {
            if(el[property].includes(Value)) {
                return true;
            } 
        } catch (error) {
            console.log(error);

        } finally {
            if(el[property] === parseInt(Value)) {
                return true;
            }
        }
        
    }).map(function (el) {
        return `${el.firstName} ${el.lastName}\n`;
    })

    return items;
}