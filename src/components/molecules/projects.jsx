import { useMemo } from 'react'
import Project from '../atoms/project';

export default function Projects() {
    const listProjects = useMemo(() => {
        return [
            {
                name: "Quran Reader",
                type: "Personal Project",
                techStack: "React, Bootstrap",
                description: (
                    <div>
                        <span>This project was made for my learning purpose. In my current company, I have to challenge myself to learning the company's tech stack. With only my bootcamp knowledge, and my school, I can't understand the company's code. <b>So I decided to learn and make small project</b>.</span>
                        <span><br /> The feature is simple, it's only get from API, and show it to the web page, user can search surah by verses name or number and copy button. I have extra feature for mobile; last read surah (from my dad's idea) and auto scroll on last read.</span>
                        <span><br /> In this project, I have to understand how front end tech in my company is work (using React), including initializing project, consuming API, rendering web page, project structrue. But it does really not a clean code at all. I just throw the code, "if it works, don't touch it" like code.</span>
                    </div>
                ),
                images: ['/images/projects/project1.jpg'],
                url: 'https://fadhil-quran.vercel.app/quran',
                sourceCodeUrl: 'https://gitlab.com/Fadhil-A/learn-react'
            },
            {
                name: "Praya",
                type: "Group Project",
                techStack: "React, Bootstrap, Node JS, Express JS, PL/SQL",
                description: (
                    <div>
                        <span>I'm proudly present, my best project in my company application. In this task, I given challenge to implement SAP (<a href="https://www.sap.com/about/company.html" className="underline">https://www.sap.com/about/company.html</a>) Integration within my company app. Such a big project. I have to mapping each detail of transaction in my company app to integrator.</span>
                        <span><br />I have to integrate efficiently and fast due to high transaction load in every single port in Indonesia, without any unhandled errors that may cause transaction and user experience to be failed and obstructed. So the idea is, I make 2 new tables to handle this. First I read the detail of transaction, find the correct mapping for each transaction with keys, and send the data by mapping in a SAP's standard code.</span>
                        <span><br />The struggle was real, we take at least 3 days to find the exact, fast and efficient way to integrating between my app and integrator till I find the best way to do it. I learn a lot how to make the code efficient, not redundant, make the query lightweight, and also mapping to the right SAP code. I found that communication between me and my team is really important, especially for brainstorming, this is challenge for me also. But everything is fine and now it's been running for almost 1 year with more than 3 Billion Rupiah transaction each day. It's not as smooth as now, but I really did hardwork to solve all problem and reduce the possibility of failure. There is also challenge for me to automation on new terminal implementation, so I don't have to do manual mapping, and I did it but still on testing.</span>
                    </div>
                ),
                images: ['/images/projects/project4.jpg']
            },
            {
                name: "Bizhub",
                type: "Group Project",
                techStack: "Next JS, Tailwind CSS, Typescript",
                description: (
                    <div>
                        <span>This project is used for Kemnaker (Indonesia Ministry of Manpower). So basically this project would facilitate every citizen in the context of the employment expansion program.</span>
                        <span>I responsible for this website for handling front end, especially for developing chat feature, integrating it with back end services, maintaining the mobile-friendly page and bug fixing some minor issue, and making some page for admin page. </span>
                        <span>I do learn a lot from this project, especially for Typescript, Tailwind, and Next JS. I also learn how to communicate with my other team mates, and learn a lot from my senior.</span>
                    </div>
                ),
                images: ['/images/projects/project3.jpg'],
                url: 'https://bizhub.kemnaker.go.id/',
            },
            {
                name: "Wedding Web",
                type: "Personal Project",
                techStack: "Next JS, Tailwind CSS",
                description: (
                    <div>
                        <span>This project is made for tribute to my brother and also challenging to myself. In this website, my brother did some research for template design, and I remaked it with some other improvement. The main feature is showing the detail of wedding, custom invitation name and RSVP for wishes.</span>
                        <span>Because mostly who open this website is using mobile, so the challenge is I must learn how to use Tailwind CSS for responsive and layouting and Next JS for the framework (I heard that next js is good and fast for static web).</span>
                        <span>Because I built this website alone, and I want to deliver the best I can do, I learn a lot from this project, responsive, project structure, clean code, SEO.</span>
                    </div>
                ),
                images: ['/images/projects/project2.jpg'],
                url: 'https://ivan-anggi-wedding.vercel.app/',
                sourceCodeUrl: 'https://github.com/Fadhil-Sabar/brother-wedding'
            },
            {
                name: "Simple Quran Mobile App (not yet finished)",
                type: "Personal Project",
                techStack: "Flutter",
                description: (
                    <div>
                        <span>This project is made for my learning purpose on Flutter. My company had a new challenge for myself, they challenge me as a mobile developer. So like how I learn before in 2022 (Quran Web), I do the same thing for learning mobile development, and the app is not finished yet.</span>
                        <span>This idea is come from myself, I want an app that just simply showing the Quran, without any other advanced features, but also accessibility feature for increasing font, so the app would be lightweight and useful. Also without an ads.</span>
                        <span>As a coder, I would prefer to learn by doing. Because of that, I can easily understand how the code works, syntax and other project structur. I gain a lot from this flutter project, I learn how to build flutter app, widget, and many others flutter tips.</span>
                    </div>
                ),
                images: ['/images/projects/project5.jpg']
            },
        ];
    }, []);

    return (
        <div className="p-4 text-[1.25em]">
            {
                listProjects.map((project, index) => (
                    <Project
                        key={index}
                        name={project.name}
                        type={project.type}
                        techStack={project.techStack}
                        description={project.description}
                        images={project.images}
                        sourceCodeUrl={project.sourceCodeUrl}
                        url={project.url}
                    />
                ))
            }
        </div>
    );
}