const fs = require('fs');

import('inquirer')

.then(({default: inquirer }) => {  // had to run default because of trouble initializing inquirer
    const questions = [
        //prompt questions for read me elements
        {
            type: 'checkbox',
            name: 'license',
            choices: ["AFL-3.0", "Apache-2.0", "Artistic-2.0", "BSL-1.0", "BSD-2-Clause",
                "BSD-3-Clause", "BSD-3-Clause-Clear", "BSD-4-Clause", "0BSD", "CC",
                "CC0-1.0", "CC-BY-4.0", "CC-BY-SA-4.0", "WTFPL", "ECL-2.0",
                "EPL-1.0", "EPL-2.0", "EUPL-1.1", "AGPL-3.0", "GPL", "GPL-2.0",
                "GPL-3.0", "LGPL", "LGPL-2.1", "LGPL-3.0", "ISC", "LPPL-1.3c",
                "MS-PL", "MIT", "MPL-2.0", "OSL-3.0", "PostgreSQL", "OFL-1.1",
                "NCSA", "Unlicense", "Zlib"],
            message: 'Pick your License.'
        },
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of your project? (it should be self-explainable?)'
        },
        {
            type: 'input',
            name: 'description',
            message: 'What does your project specifically do? Try to include context, links, features or background, what makes your project different than alternatives?'
        },
        {
            type: 'input',
            name: 'installation',
            message: 'what installations are required, list specific steps for beginners, include langauges or operating system, and especially any dependencies that need manual instalation.'
        },
        {
            type: 'input',
            name: 'usage',
            message: 'What is a popular use case for this project?'
        },
        {
            type: 'input',
            name: 'support',
            message: 'Where can people go for help? Who can they reach out to?'
        },
        {
            type: 'input',
            name: 'roadmap',
            message: 'list the future possibilities for this projects growth.'
        },
        {
            type: 'checkbox',
            name: 'contributions',
            choices: ['yes', 'no'],
            message: 'Are you open to contributions?'
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is your github username?'
        },
        {
            type: 'input',
            name: 'acknowledgement',
            message: 'Please list those who contributed to this project.'
        },
        {
            type: 'radio',
            name: 'projectStatus',
            choices: ['yes', 'no'],
            message: 'has developement slowed down or stopped completely?'
        },
        {
            type: 'input',
            name: 'testing',
            message: 'Explain any testing that was done?'
        },
    ];

    inquirer.prompt(questions) 
        .then(answers => {
            const badge = renderLicenseBadge(answers.license[0]); // selected license leads to badge
            const markdownContent = generateMarkdown(answers, badge); //write to readme.md
            fs.writeFile('./README.md', markdownContent, function (err) {
                if (err) {
                    throw err;

                }
                console.log('README.md created successfully, now make it shine!')
            });
        });
})
    .catch(err => {
        console.log(err);
    });
 
        
function renderLicenseBadge(license) {
    let yourLicense = ''
    if (license === 'MIT') {
        yourLicense = `![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)`;
    } else if (license === "UNLICENSED") {
        yourLicense = "" // no badge for unlicensed, need to add more options.
    }
    return yourLicense;
}

function generateMarkdown(answers, badge) {
    return `

    # ${answers.title} 

    ## Table of Contents:  
    ${answers.description} 

    ## Thank you, all who contributed! 
    ${answers.acknowledgement} 

    ### License: ${answers.license} ${badge}

    ## Usage ${answers.usage}

    ## Testing ${answers.testing}

    ## Visuals 
    XXXXXX Add visuals here XXXXXX

    ## Installation: ${answers.installation}

    ## Questions: ${answers.support}

    ## Github profile: http://www.github.com/${answers.github}

    ## Roadmap: ${answers.roadmap}

    ### Open to contributions? ${answers.contributions}

    ### Project Status: ${answers.projectStatus}`;
}

// module.exports = generateMarkdown;