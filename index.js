const fs = require('fs');
const inquirer = require('inquirer');

//prompt questions for read me elements
const questions = [
    {
        type: 'checkbox',
        name: 'license',
        choices: ["MIT", "UNLICENSED"],
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
        message: 'what installations are required, list specific steps for beginners, include langauges or operating system, and especially any dependencies that need manual instalation'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'What is a popular use case for this project?'
    },
    {
        type: 'input',
        name: 'Support',
        message: 'Where can people go for help? Who can they reach out to?'
    },
    {
        type: 'input',
        name: 'Roadmap',
        message: 'list the future possibilities for this projects growth'
    },
    {
        type: 'checkbox',
        name: 'contributions',
        choices: ['yes', 'no'],
        message: 'Are you open to contributions?'
    },
    {
        type: 'input',
        name: 'acknowledgement',
        message: 'Please list those who contributed to this project'
    },
    {
        type: 'radio',
        name: 'projectStatus',
        choices: ['yes', 'no'],
        message: 'has developement slowed down or stopped completely?'
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

    ## Description:  
    ${answers.description} 

    ## Thank you, all who contributed! ${answers.acknowledgement} 

    ### License: ${answers.license} ${badge}

    ## Usage ${answers.usage}

    ## Visuals 
    XXXXXX Add visuals here XXXXXX

    ## Installation: ${answers.installation}

    ## Support: ${answers.support}

    ## Roadmap: ${answers.roadmap}

    ### Open to contributions? ${answers.contributions}

    ### Project Status: ${answers.ProjectStatus}`;
}

// module.exports = generateMarkdown;