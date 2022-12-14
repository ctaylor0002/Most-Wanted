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
            let personInfo = displayPerson(person);
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

//Utilize this setup for removing the commas in my arrays of my alerts
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
// Any additional functions can be written below this line ????. Happy Coding! ????


function displayPerson(person) {
    let personInfoProperties = ["First Name:", "Last Name:", "ID:", "Gender:", "Date of Birth:", "Height:", "Weight:", "Eye Color:", "Occupation:"];
    let personInfo = person.map(function (el) {
        return (`${personInfoProperties[0]} ${el.firstName}\n`+
        `${personInfoProperties[1]} ${el.lastName}\n`+
        `${personInfoProperties[2]} ${el.id}\n`+
        `${personInfoProperties[3]} ${el.gender}\n`+
        `${personInfoProperties[4]} ${el.dob}\n`+
        `${personInfoProperties[5]} ${el.height}\n`+
        `${personInfoProperties[6]} ${el.weight}\n`+
        `${personInfoProperties[7]} ${el.eyeColor}\n`+
        `${personInfoProperties[8]} ${el.occupation}\n`);
    })
    return personInfo;

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
    let siblings = findSiblings(person, people);
    console.log(siblings);
    let parents = findPersonParents(person, people);
    console.log(parents);
    let spouse = findSpouse(person, people);
    console.log(spouse);
    let returnData = parents.concat(siblings, spouse).join("\n");

    return returnData;
}

function findPersonParents(person, people) {
    let parents = people.filter(function (element) {
        let personParentID = person.parents

        if (personParentID.length >= 1) {
            for(let i=0;i<=personParentID.length;i++) {
                if (personParentID[i] === element.id) {
                    return true;
                }
                 
            }

        }

    }).map(function (el) {
        return `Parent: ${el.firstName} ${el.lastName}`;
    })

    if (parents.length < 1) {
        parents.push('No Parents were found in our database.');
    }
        return parents;
}

function findSpouse(person, people) {
    
    //Instead of searching based on last name utilize the parents (In this dataset each child has both the same parents) Utilize includes and filter
    let foundSpouse = people.filter(function (el) {
        if (el.id === person.currentSpouse) {
            return true;
        } else {
            return false;
        }
    }).map(function (el) {
        return `Spouse: ${el.firstName} ${el.lastName}`;
    })
    
    if (foundSpouse.length < 1) {
        foundSpouse.push('No Spouse was found in our database.');
    } 
        return foundSpouse; 
}

function findSiblings(person, people) {
    let siblings = people.filter(function (el) {
        if (el.parents.includes(person.parents[0]) || el.parents.includes(person.parents[1])) {
            if (el.id === person.id) {
                return false;
            }
            return true;
        } else {
            return false;
        }
    }).map(function (el) {
        return `Sibling: ${el.firstName} ${el.lastName}`;
    })

    if (siblings.length < 1) {
        siblings.push('No Siblings were found in our database.')
    }
        return siblings;
    
    
}


/**
 * This function's purpose is to use recusion to find all people that are children of a specific parent.
 * If any are applicable
 * @param {Object} parent       Holds the Parent Object
 * @param {Array} people        Holds the Database of People
 */


function findPersonDescendants(parent, people) {
    let subArray = findPersonDescendantsWithRecursion(parent, people);
    let mappedDescendants = mapDescendants(subArray, parent);
    return mappedDescendants;
}

function findPersonDescendantsWithRecursion(parent, people,  array = []) {
    //Come back to this part

    //I have to use recursion for the grandchildren

    let subArray = people.filter(function (el) {
        if (el.parents.includes(parent.id)) {
            return true;
        } else {
            return false;
        }
    })

    array = [parent];

    if (subArray.length === 0) {
        return  array;
    }

    for (let i=0; i<subArray.length; i++) {
        array = array.concat (findPersonDescendantsWithRecursion(subArray[i], people));
    }
    
    return array;
    
}
function mapDescendants(array, parent) {
    array = array.filter(function (el) {
        if (el.id === parent.id) {
            return false;
        } else {
            return true;
        }
    }).map(function (el) {
        return `${el.firstName} ${el.lastName}`
    })


    if (array.length === 0) {
        return "No Children were found in our database."
    } else {
        array = array.join("\n");
        return array;
    }

}



function searchByTraits(people) {
    let counter = 0;
    let searchValue;
    let filteredUsers = people;
    

    while (counter <5) {
        counter = counter + 1;
        const props = Object.getOwnPropertyNames(people[0])
        
        searchValue = (promptFor(
            `Searching based on id? Enter '${props[0]}'\n` +
            `Searching based on First Name? Enter '${props[1]}'\n` +
            `Searching based on Last Name? Enter '${props[2]}'\n` +
            `Searching based on Gender? Enter '${props[3]}'\n` +
            `Searching based on Date of Birth? Enter '${props[4]}'\n` +
            `Searching based on Height? Enter '${props[5]}'\n` +
            `Searching based on Weight? Enter '${props[6]}'\n` +
            `Searching based on Eye Color? Enter '${props[7]}'\n` +
            `Searching based on Occupation? Enter '${props[8]}'\n` +
            `Searching based on Parents? Enter '${props[9]}'\n` +
            `Searching based on Current Spouse? Enter '${props[10]}'\n`,
        chars
        ));

        switch (searchValue) {
            case "id":
                filteredUsers = searchByProperty(filteredUsers,props[0]);
                break;
            case "firstName":
                filteredUsers = searchByProperty(filteredUsers,props[1]);
                break;
            case "lastName":
                filteredUsers = searchByProperty(filteredUsers,props[2]);
                break;
            case "gender":
                filteredUsers = searchByProperty(filteredUsers,props[3]);
                break;
            case "dob":
                filteredUsers = searchByProperty(filteredUsers,props[4]);
                break;
            case "height":
                filteredUsers = searchByProperty(filteredUsers,props[5]);
                break;
            case "weight":
                filteredUsers = searchByProperty(filteredUsers,props[6]);
                break;
            case "eyeColor":
                filteredUsers = searchByProperty(filteredUsers,props[7]);
                break;
            case "occupation":
                filteredUsers = searchByProperty(filteredUsers,props[8]);
                break;
            case "parents":
                filteredUsers = searchByProperty(filteredUsers,props[9]);
                break;
            case "currentSpouse":
                filteredUsers = searchByProperty(filteredUsers,props[10]);
                break;
            default:
                app(people);
                break;

        }

        //filteredUsers = searchByProperty(filteredUsers, searchValue);
        
        let question = promptFor("Would you like to add more filters? ('yes' or 'no')", yesNo).toLowerCase();

        switch (question) {
            case "yes":
                continue;
            case "no":
                counter = 5;
        }

    }
    filteredUsers = filteredUsers.map(function (el) {
        return `${el.firstName} ${el.lastName}`;
    })

    if (filteredUsers.length === 0) {
        alert("No Users were found with that criteria.");
    } else {
        filteredUsers = filteredUsers.join("\n");
        alert(filteredUsers);
    }
}

function searchByProperty(people, property) {
    let Value = prompt(`Enter ${property} Value: `)
    let items = people.filter(function (el) {
        if (el[property] == Value) {
            return true;
        } else {
            return false;
        }
        
    })
    return items;
}